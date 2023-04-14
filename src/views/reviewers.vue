<script setup>
import Record from "../components/record.vue";
import { ref, reactive, onMounted } from "vue";
import * as api from "../modules/apiTools.js";
import { PropuestaTg } from "../modules/classes/planillaPropuesta.js";
import { PlanillaDesignacionRevisor } from "../modules/classes/planillaDesignacionRevisor.js";

let dataPropuestasPorRevisor = reactive([]);

//control de formulario de designacion
let showDesignarTutor = ref(false);

//Lista de comites en bdd
let profesoresADesignar = ref([]);
let formularioPropuesta = ref(new PropuestaTg());

const onSubmit = async ()  => {
  console.log("submit")
}
const clickenComponente = async (id) => {

  formularioPropuesta.value = await api.obtenerTGById(id);
  console.log(formularioPropuesta.value);
};

const designarTutor = async () => {
  console.log("formularioPropuesta");
  console.log(formularioPropuesta.value.id_profesor_revisor);
  console.log(formularioPropuesta.value.id_tg);

  const propuesta = await api.obtenerTGById(formularioPropuesta.value.id_tg);
  console.log("Propuesta");
  console.log(propuesta)

  const empresaTG = await api.obtenerEmpresaById(propuesta.id_empresa)
  await api.designarRevisor(
    formularioPropuesta.value.id_tg,
    formularioPropuesta.value.id_profesor_revisor
  );

  let alumnos = await api.obtenerEstudianteDeTG(
    formularioPropuesta.value.id_tg
  );

  let revisor = await api.obtenerProfesorByCedula(
    formularioPropuesta.value.id_profesor_revisor
  );
  if (formularioPropuesta.value.modalidad === "E") {
    let tutor_academico = await api.obtenerProfesorByCedula(
      formularioPropuesta.value.id_tutor_academico
    );
    let planillaDesignacionDeRevisor = new PlanillaDesignacionRevisor(
      formularioPropuesta.value.titulo,
      tutor_academico,
      new Date(),
      {
        nombre: "Luz E. Medina",
        correo_administrador: "lmedinac@ucab.edu.ve",
      },
      formularioPropuesta.value.modalidad,
      `${revisor.nombres} ${revisor.apellidos}`,
      empresaTG.nombre
    );
    planillaDesignacionDeRevisor.añadirAlumno(alumnos[0]);
    console.log("planillaDesignacionDeRevisor");
    console.log(planillaDesignacionDeRevisor);
    planillaDesignacionDeRevisor.imprimir();
  } else {
    let tutor_empresarial = await api.obtenerExternosById(
      formularioPropuesta.value.id_tutor_empresarial
    );
    console.log("tutor_empresarial")
    console.log(tutor_empresarial)
    let planillaDesignacionDeRevisor = new PlanillaDesignacionRevisor(
      formularioPropuesta.value.titulo,
      tutor_empresarial,
      new Date(),
      {
        nombre: "Luz E. Medina",
        correo_administrador: "lemedina@ucab.edu.ve",
      },
      formularioPropuesta.value.modalidad,
      `${revisor.nombres} ${revisor.apellidos}`,
      empresaTG.nombre
    );

    planillaDesignacionDeRevisor.añadirAlumno(alumnos[0]);
    planillaDesignacionDeRevisor.imprimir();
    
  }
  dataPropuestasPorRevisor.value = await api.obtenerPropuestaSinRevisor();
  formularioPropuesta.value = new PropuestaTg();
};

onMounted(async () => {
  dataPropuestasPorRevisor.value = await api.obtenerPropuestaSinRevisor();
  profesoresADesignar.value = await api.obtenerProfesores();
});
</script>
<template>
  <div class="request">
    <h1>Designacion de Revisor</h1>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__controllers">
          <button>
            <img src="../assets/imgs/search-circle-outline.svg" />Buscar
            Solicitud
          </button>
        </div>
        <div class="committe__container__display__list">
          <!-- Aqui va el registro para las propuestas de trabajo de grado -->
          <Record
            class="request__container__display__list__record"
            v-for="t in dataPropuestasPorRevisor.value"
            :key="t.id_tg"
            :id_tg="t.id_tg_formateado"
            :titulo="t.titulo"
            :fecha_solicitud="t.fecha_solicitud"
            :modalidad="t.modalidad"
            :estatus="t.estatus"
            @click="clickenComponente(t.id_tg)"
          />
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form action="" class="committe__container__preview__form" @submit.prevent="onSubmit">
          <h2>Visualización del documento de solicitud</h2>
          <div class="request__container__preview__form up-de">
            <div class="request__container__preview__form__inputs">
              <p>Titulo del Trabajo</p>
              <textarea
                disabled
                maxlength="200"
                v-model="formularioPropuesta.titulo"
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Tutilo de Propuesta TG"
              ></textarea>
              <p>Modalidad</p>
              <input
                disabled
                type="text"
                v-model="formularioPropuesta.modalidad"
              />
              <p>Profesor revisor a designar: </p>
              <select
                name="profesoresADesignar"
                id=""
                v-model="formularioPropuesta.id_profesor_revisor"
              >
                <option
                  v-for="p in profesoresADesignar"
                  :key="p.nombres"
                  :value="p.cedula"
                >
                  {{ p.nombres + " " + p.apellidos }}
                </option>
              </select>
            </div>
            <div class="actions">
              <button 
                class="succes" 
                @click="designarTutor()"
                :disabled=" formularioPropuesta.id_profesor_revisor == '' || formularioPropuesta.id_profesor_revisor == undefined || formularioPropuesta.id_tg == '' "
              >
                Designar Tutor
              </button>
            </div>
          </div>
        </form>
        <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
      </div>
    </div>
  </div>
</template>
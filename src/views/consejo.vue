<script setup>
import Record from "../components/record.vue";
import { PropuestaTg } from "../modules/classes/planillaPropuesta.js";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { FormularioCartaDesigancion } from "../modules/classes/formularioCartaDesignacion.js";

let data = reactive([]);
let dataConsejo = reactive([]);
let tutor = reactive({
  apellidos: "",
  cargo: "",
  cedula: "",
  email: "",
  experiencia: "",
  graduado: "",
  habitacion: "",
  nombres: "",
  oficina: "",
  telefono: "",
});

let cde = reactive({
  id_cde: "",
  fecha_conformacion: "",
  observaciones : ""
});
console.log("GOKLA")
console.log(import.meta.env.BASE_URL);

let formularioPropuesta = ref(new PropuestaTg());

const clickenComponente = async (id) => {
  console.log(id);
  formularioPropuesta.value = await api.obtenerTGById(id);
  console.log(formularioPropuesta);
};

const rechazarTG = async (id) => {
  await api.rechazarPropuestaCDE(id);
  data.value = await api.obtenerPropuestas("PE");
  formularioPropuesta.value = new PropuestaTg();
};

const aceptarTG = async (id) => {

  //formularioPropuesta.value.id_cde
  await api.aprobarPropuestaCDE(id,formularioPropuesta.value.id_cde);

  //await api.asignarTutorAcademico(id, formularioPropuesta.value.id_tg);
  alert("aceptado");
  const estudiante = await api.obtenerEstudianteDeTG(id);
  const tutor_academico = await api.obtenerProfesorByCedula(
    formularioPropuesta.value.id_tutor_academico
  );
  let tutor_empresarial = null;
  if(formularioPropuesta.value.modalidad == 'I'){
    tutor_empresarial = await api.obtenerExternosById(
      formularioPropuesta.value.id_tutor_empresarial
    );
  }
 
  const consejoEscuela = await api.obtenerCDEById(formularioPropuesta.value.id_cde)
  const empresa = await api.obtenerEmpresaById(formularioPropuesta.value.id_empresa)
  const cartaDesignacion = new FormularioCartaDesigancion(
    formularioPropuesta.value.titulo,
    formularioPropuesta.value.modalidad,
    estudiante,
    tutor_academico,
    tutor_empresarial,
    consejoEscuela.id_cde_formateado,
    "Luz E. Medina",
    empresa.nombre
  );
  //cartaDesignacion.imprimirPlanilla(id);

  data.value = await api.obtenerPropuestas("PE");
  formularioPropuesta.value = new PropuestaTg();
};

onMounted(async () => {
  data.value = await api.obtenerPropuestas("PE");
  dataConsejo.value = await api.obtenerCDE();
  //console.log("data.value")
  console.log(dataConsejo.value)
});
</script>
<template>
  <div class="request">
    <h1>Consejo de escuela</h1>
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
            v-for="p in data.value"
            :key="p.id_tg"
            :id_tg="p.id_tg_formateado"
            :titulo="p.titulo"
            :fecha_solicitud="p.fecha_solicitud"
            :modalidad="p.modalidad"
            :estatus="p.estatus"
            @click="clickenComponente(p.id_tg)"
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
              <p>Fecha de solicitud</p>
              <input
                disabled
                type="date"
                v-model="formularioPropuesta.fecha_solicitud"
              />
              <p>Estatus</p>
              <input
                disabled
                type="text"
                v-model="formularioPropuesta.estatus"
              />
              <p>Seleccione el Consejo de Escuela evaluador</p>
              <select name="CDE" id="" v-model="formularioPropuesta.id_cde">
                <option
                  v-for="c in dataConsejo.value"
                  :key="c.id_cde"
                  :value="c.id_cde"
                >
                  {{ c.id_cde_formateado }}
                </option>
              </select>
              <textarea
                maxlength="200"
                v-model="formularioPropuesta.observaciones_consejo"
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Observaciones"
              ></textarea>
            </div>
            <div class="actions">
              <button
                class="login__form__btn succes"
                @click="aceptarTG(formularioPropuesta.id_tg)"
                :disabled=" formularioPropuesta.id_cde=='' "
              >
                Aceptar
              </button>
              <button
                class="cancel"
                @click="rechazarTG(formularioPropuesta.id_tg)"
                :disabled=" formularioPropuesta.id_cde == '' || formularioPropuesta.observaciones_consejo == '' || formularioPropuesta.observaciones_consejo == undefined"
              >
                Rechazar
              </button>
            </div>
          </div>
        </form>
        <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
      </div>
    </div>
  </div>
</template>
<style>
/*Esta etiqueta esta vacia*/
</style>
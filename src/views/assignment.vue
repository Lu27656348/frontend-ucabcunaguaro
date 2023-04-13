<script setup>
import Record from "../components/record.vue";
import { PropuestaTg } from "../modules/classes/planillaPropuesta.js";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { FormularioCartaDesigancion } from "../modules/classes/formularioCartaDesignacion.js";

let data = reactive([]);
let dataConsejo = reactive([]);
let dataProfesores = reactive([]);
let cdeRef = ref('');
let observaciones = ref('');
let formularioPropuesta = ref(new PropuestaTg());

const clickenComponente = async (id) => {
  formularioPropuesta.value = await api.obtenerTGById(id);
  console.log(formularioPropuesta);
};

const asignarTutorAcademico = async () => {
  let tutor_empresarial = null;
  
  const res = await api.asignarTutorAcademico(
    formularioPropuesta.value.id_tg,
    formularioPropuesta.value.id_tutor_academico,
    observaciones.value
  );
  
  const estudiante = await api.obtenerEstudianteDeTG(
    formularioPropuesta.value.id_tg
  );
  const tutor_academico = await api.obtenerProfesorByCedula(
    formularioPropuesta.value.id_tutor_academico
  );
  if (formularioPropuesta.value.modalidad === "I") {
    tutor_empresarial = await api.obtenerExternosById(
      formularioPropuesta.value.id_tutor_empresarial
    );
  }
  const propuesta = await api.obtenerTGById(formularioPropuesta.value.id_tg);
  const empresaTG = await api.obtenerEmpresaById(propuesta.id_empresa);
  const consejoTG = await api.obtenerCDEById(cdeRef.value)

  const cartaDesignacion = new FormularioCartaDesigancion(
    formularioPropuesta.value.titulo,
    formularioPropuesta.value.modalidad,
    estudiante,
    tutor_academico,
    tutor_empresarial,
    consejoTG.id_cde_formateado,
    "Luz E. Medina",
    empresaTG.nombre
  );

  cartaDesignacion.imprimirPlanilla();
  data.value = await api.obtenerPropuestasSinTutorAcademicoAsignado();
  formularioPropuesta.value = new PropuestaTg();
};

onMounted(async () => {
  data.value = await api.obtenerPropuestasSinTutorAcademicoAsignado();
  dataConsejo.value = await api.obtenerCDE();
  dataProfesores.value = await api.obtenerProfesores();
});
</script>
<template>
  <div class="request">
    <h1>Asignacion de Tutor Academico</h1>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__controllers">
          <button>
            <img src="../assets/imgs/search-circle-outline.svg" />Buscar
            sdsdsdsd
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
            <input disabled type="text" v-model="formularioPropuesta.estatus" />
            <p>Seleccione el tutor académico: </p>
            <select
              name="CDE"
              id=""
              v-model="formularioPropuesta.id_tutor_academico"
            >
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
              >
                {{ `${p.nombres} ${p.apellidos}` }}
              </option>
            </select>
            <p>Seleccione el Consejo de Escuela que designó al tutor: </p>
            <select
              name="CDEs"
              id=""
              v-model="cdeRef"
            >
              <option
                v-for="p in dataConsejo.value"
                :key="p.id_cde"
                :value="p.id_cde"
              >
                {{ p.id_cde_formateado }}
              </option>
            </select>
          </div>
          <textarea
              maxlength="200"
              v-model="observaciones"
              class="request__container__preview__form__inputs--titulo-tg"
              placeholder="Observaciones"
          ></textarea>
          <div class="actions">
            <button
              class="login__form__btn succes"
              @click="asignarTutorAcademico()"
              :disabled="cdeRef == '' || formularioPropuesta.id_tutor_academico == '' || formularioPropuesta.id_tg==''"
            >
              Asignar Tutor Academico
            </button>
          </div>
        </div>
        <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
      </div>
    </div>
  </div>
</template>
<style>
/*Esta etiqueta esta vacia*/
</style>
<script setup>
import Record from "../components/record.vue";
import { ref, reactive, onMounted } from "vue";
import * as api from "../modules/apiTools.js";
import { PropuestaTg } from "../modules/classes/planillaPropuesta.js";

let dataPropuestasConRevisorAsignado = reactive([]);

//control de formulario de designacion
let showDesignarTutor = ref(false);
let revisor = ref("");

//Lista de comites en bdd
let profesoresADesignar = ref([]);
let formularioPropuesta = ref(new PropuestaTg());
const onSubmit = async ()  => {
  console.log("submit")
}
const clickenComponente = async (id) => {
  console.log(id);
  formularioPropuesta.value = await api.obtenerTGById(id);
  console.log(formularioPropuesta.value);
  revisor.value = await api.obtenerProfesorByCedula(formularioPropuesta.value.id_profesor_revisor);
};

const rechazarPropuesta = async () => {
  await api.rechazarPropuestaRevisor(formularioPropuesta.value.id_tg, formularioPropuesta.value.observaciones_revisor);
  alert("Rechazada por Revisor");
  dataPropuestasConRevisorAsignado.value = await api.obtenerPropuestaConRevisorAsignado();
  formularioPropuesta.value = new PropuestaTg();
};

const aprobarPropuesta = async () => {
  await api.aprobarPropuestaRevisor(formularioPropuesta.value.id_tg, formularioPropuesta.value.observaciones_revisor);
  alert("Aprobada por Revisor");
  dataPropuestasConRevisorAsignado.value = await api.obtenerPropuestaConRevisorAsignado();
  formularioPropuesta.value = new PropuestaTg();
};

onMounted(async () => {
  dataPropuestasConRevisorAsignado.value = await api.obtenerPropuestaConRevisorAsignado();
});
</script>
<template>
  <div class="request">
    <h1>Evaluacion de Revisor</h1>
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
            v-for="t in dataPropuestasConRevisorAsignado.value"
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
                v-model="formularioPropuesta.titulo"
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Tutilo de Propuesta TG"
              ></textarea>
              <p>Modalidad</p>
              <input
                disabled
                type="text"
                placeholder="modalidad"
                v-model="formularioPropuesta.modalidad"
              />
              <p>Revisor</p>
              <input disabled type="text" placeholder="Nombres" v-model="revisor.nombres"/>
              <input disabled type="text" placeholder="Apellidos" v-model="revisor.apellidos"/>
              <input disabled type="text" placeholder="Cedula" v-model="revisor.cedula"/>
              <strong>Observaciones</strong>
              <textarea
                style="height: 50px;"
                v-model="formularioPropuesta.observaciones_revisor"
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Observaciones..."
                :disabled="formularioPropuesta.titulo == ''"
              ></textarea>
            </div>

            <div class="actions">
              <button
                class="succes"
                @click="aprobarPropuesta()"
                :disabled="formularioPropuesta.titulo == '' || formularioPropuesta.revisor == ''"
              >
              Aceptar
            </button>
            <button 
              class="cancel" 
              @click="rechazarPropuesta()"
              :disabled="formularioPropuesta.titulo == '' || formularioPropuesta.observaciones_revisor == '' || formularioPropuesta.observaciones_revisor == undefined"
              >
              Rechazar
            </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </form>
      </div>
    </div>
  </div>
</template>
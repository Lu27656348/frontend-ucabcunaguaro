<script setup>
import Record from "../components/record.vue";
import { ref, reactive, onMounted } from "vue";
import * as api from "../modules/apiTools.js";
import { PropuestaTg } from "../modules/classes/planillaPropuesta.js";

let dataPropuestas = reactive([]);

let dataFiltrada = reactive([]);
let dataFiltradaRealizaCedula = reactive([]);

let btnFiltrado = ref(false);
let btnFiltradoCedula = ref(false);
let btnFiltradoModalidad = ref(false);

const tituloParaFiltrar = ref(null);
const cedulaParaFiltrar = ref(null);
const modalidadParaFiltrar = ref(null);

//control de formulario de designacion
let revisor = ref("");

//Lista de comites en bdd
let formularioPropuesta = ref(new PropuestaTg());

const onSubmit = async () => {
  console.log("submit");
};

function showFiltrado() {
  btnFiltrado.value = !btnFiltrado.value;
  btnFiltradoCedula.value = false;
  btnFiltradoModalidad.value = false;
}
function showFiltradoCedula() {
  btnFiltradoCedula.value = !btnFiltradoCedula.value;
  btnFiltrado.value = false;
  btnFiltradoModalidad.value = false;
}
function showFiltradoModalidad() {
  btnFiltradoModalidad.value = !btnFiltradoModalidad.value;
  btnFiltradoCedula.value = false;
  btnFiltrado.value = false;
}

function filtrarListaTitulo() {
  console.log("Titulo para filtrar");
  console.log("Valor: " + tituloParaFiltrar.value);

  if (tituloParaFiltrar.value != null) {
    dataFiltrada.value = dataPropuestas.value.filter((t) =>
      t.titulo.includes(tituloParaFiltrar.value)
    );
    console.log(dataFiltrada.value);
  }
  btnFiltrado.value = false;
  tituloParaFiltrar.value = "";
  return;
}

const filtrarListaCedulaEstudiante = () => {
  console.log("Cedula a filtrar");
  console.log("Cedula: " + cedulaParaFiltrar.value);
  if (cedulaParaFiltrar.value != null) {
    dataFiltrada.value = dataFiltradaRealizaCedula.value.filter((t) =>
      t.realiza_tg.cedula_estudiante.includes(cedulaParaFiltrar.value)
    );
    console.log(dataFiltrada.value);
  }
  btnFiltradoCedula.value = false;
  cedulaParaFiltrar.value = "";
  return;
};

const filtrarListaModalidad = (modalidad) => {
  console.log("Modalidad para filtrar");
  console.log("Modalidad: " + modalidadParaFiltrar.value);

  modalidadParaFiltrar.value = modalidad;

  if (modalidadParaFiltrar.value != null) {
    dataFiltrada.value = dataPropuestas.value.filter(
      (t) => t.modalidad == modalidadParaFiltrar.value
    );
    console.log(dataFiltrada.value);
  } else {
    dataFiltrada.value = dataPropuestas.value;
  }
  btnFiltradoModalidad.value = false;
  modalidadParaFiltrar.value = null;
  return;
};

const clickenComponente = async (id) => {
  console.log(id);
  formularioPropuesta.value = await api.obtenerTGById(id);
  console.log(formularioPropuesta.value);
  revisor.value = await api.obtenerProfesorByCedula(
    formularioPropuesta.value.id_profesor_revisor
  );
};

const rechazarPropuesta = async () => {
  await api.rechazarPropuestaRevisor(
    formularioPropuesta.value.id_tg,
    formularioPropuesta.value.observaciones_revisor
  );
  alert("Rechazada por Revisor");
  await pedirData();
  formularioPropuesta.value = new PropuestaTg();
};

const aprobarPropuesta = async () => {
  await api.aprobarPropuestaRevisor(
    formularioPropuesta.value.id_tg,
    formularioPropuesta.value.observaciones_revisor
  );
  alert("Aprobada por Revisor");
  await pedirData();
  formularioPropuesta.value = new PropuestaTg();
};

const pedirData = async () => {
  dataPropuestas.value = await api.obtenerPropuestaConRevisorAsignado();
  dataFiltradaRealizaCedula.value = await api.obtenerEstudiantesConRevisorRealizaTG();
  dataFiltrada.value = dataPropuestas.value;
};

onMounted(async () => {
  await pedirData();
});
</script>
<template>
  <div class="request">
    <h1>Evaluacion de Revisor</h1>
    <div class="committe__container__display__controllers">
      <button @click="showFiltradoCedula()">
        <ion-icon name="person-circle-outline"></ion-icon>Buscar Estudiante
      </button>
      <button @click="showFiltrado()">
        <ion-icon name="bulb-outline"></ion-icon>Buscar Propuesta
      </button>
      <button @click="showFiltradoModalidad()" class="succes">
        <ion-icon name="cog-outline"></ion-icon>Buscar Modalidad
      </button>
      <button @click="actionShowPlanillaCrear()">
        <img src="../assets/imgs/add-circle-outline.svg" alt="" />Crear Planilla
      </button>
    </div>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__list">
          <!-- Aqui va el registro para las propuestas de trabajo de grado -->
          <Record
            class="request__container__display__list__record"
            v-for="t in dataFiltrada.value"
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
        <form
          action=""
          class="committe__container__preview__form"
          @submit.prevent="onSubmit"
        >
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
              <input
                disabled
                type="text"
                placeholder="Nombres"
                v-model="revisor.nombres"
              />
              <input
                disabled
                type="text"
                placeholder="Apellidos"
                v-model="revisor.apellidos"
              />
              <input
                disabled
                type="text"
                placeholder="Cedula"
                v-model="revisor.cedula"
              />
              <strong>Observaciones</strong>
              <textarea
                style="height: 50px"
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
                :disabled="
                  formularioPropuesta.titulo == '' ||
                  formularioPropuesta.revisor == ''
                "
              >
                Aceptar
              </button>
              <button
                class="cancel"
                @click="rechazarPropuesta()"
                :disabled="
                  formularioPropuesta.titulo == '' ||
                  formularioPropuesta.observaciones_revisor == '' ||
                  formularioPropuesta.observaciones_revisor == undefined
                "
              >
                Rechazar
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </form>
      </div>
    </div>
    <div
      id="Filtrado-Titulo"
      class="filter-form"
      :style="btnFiltrado ? 'Top: 0' : 'top: -1000px'"
    >
      <ion-icon name="close-circle-outline" @click="showFiltrado()"></ion-icon>
      <p>Ingrese el Titulo de Trabajo de Grado</p>
      <input
        type="text"
        v-model="tituloParaFiltrar"
        placeholder="Cuando aparezca este texto puede listar todos los TG."
      />
      <button @click="filtrarListaTitulo()">Buscar propuesta</button>
    </div>
    <div
      id="Filtrado-Cedula"
      class="filter-form"
      :style="btnFiltradoCedula ? 'Top: 0' : 'top: -1000px'"
    >
      <ion-icon
        name="close-circle-outline"
        @click="showFiltradoCedula()"
      ></ion-icon>
      <p>
        Ingrese la <strong>Cedula</strong> del <strong>Estudiante</strong> a
        filtrar
      </p>
      <input
        type="number"
        v-model="cedulaParaFiltrar"
        placeholder="Cuando aparezca este texto puede listar todos los TG."
      />
      <button @click="filtrarListaCedulaEstudiante()">Buscar propuesta</button>
    </div>
    <div
      id="Filtrado-Cedula"
      class="filter-form"
      :style="btnFiltradoModalidad ? 'Top: 0' : 'top: -1000px'"
    >
      <ion-icon
        name="close-circle-outline"
        @click="showFiltradoModalidad()"
      ></ion-icon>
      <p>
        Elija la <strong>Modalidad</strong> del Trabajo de Grado para filtrar
      </p>

      <button @click="filtrarListaModalidad('I')">Instrumental</button>
      <button @click="filtrarListaModalidad('E')">Experimental</button>
      <button @click="filtrarListaModalidad(null)">Todas</button>
    </div>
  </div>
</template>
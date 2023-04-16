<script setup>
import Record from "../components/record.vue";
import { PropuestaTg } from "../modules/classes/planillaPropuesta.js";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { FormularioCartaDesigancion } from "../modules/classes/formularioCartaDesignacion.js";

let dataPropuestas = reactive([]);
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
  observaciones: "",
});

let dataFiltrada = reactive([]);
let dataFiltradaRealizaCedula = reactive([]);

let btnFiltrado = ref(false);
let btnFiltradoCedula = ref(false);
let btnFiltradoModalidad = ref(false);

const tituloParaFiltrar = ref(null);
const cedulaParaFiltrar = ref(null);
const modalidadParaFiltrar = ref(null);

let formularioPropuesta = ref(new PropuestaTg());

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
  console.log(formularioPropuesta);
  console.log(formularioPropuesta.value.id_cde);
};

const rechazarTG = async (id) => {
  await api.rechazarPropuestaCDE(id);
  await pedirData();
  formularioPropuesta.value = new PropuestaTg();
};

const aceptarTG = async (id) => {
  //formularioPropuesta.value.id_cde
  await api.aprobarPropuestaCDE(id, formularioPropuesta.value.id_cde);

  //await api.asignarTutorAcademico(id, formularioPropuesta.value.id_tg);
  alert("aceptado");
  const estudiante = await api.obtenerEstudianteDeTG(id);
  const tutor_academico = await api.obtenerProfesorByCedula(
    formularioPropuesta.value.id_tutor_academico
  );
  let tutor_empresarial = null;
  if (formularioPropuesta.value.modalidad == "I") {
    tutor_empresarial = await api.obtenerExternosById(
      formularioPropuesta.value.id_tutor_empresarial
    );
  }

  const consejoEscuela = await api.obtenerCDEById(
    formularioPropuesta.value.id_cde
  );
  const empresa = await api.obtenerEmpresaById(
    formularioPropuesta.value.id_empresa
  );
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

  await pedirData();
  formularioPropuesta.value = new PropuestaTg();
};

const pedirData = async () => {
  dataPropuestas.value = await api.obtenerPropuestas('PE');
  dataFiltradaRealizaCedula.value = await api.obtenerTGSinConsejoEscuelaRealizaTG();
  dataFiltrada.value = dataPropuestas.value;
  dataConsejo.value = await api.obtenerCDE();
};

onMounted(async () => {
  await pedirData();
});
</script>
<template>
  <div class="request">
    <h1>Consejo de escuela</h1>
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
        <img src="../assets/imgs/add-circle-outline.svg" alt="" />Crear
        Planilla
      </button>
    </div>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__list">
          <!-- Aqui va el registro para las propuestas de trabajo de grado -->
          <Record
            class="request__container__display__list__record"
            v-for="p in dataFiltrada.value"
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
                class="succes"
                @click="aceptarTG(formularioPropuesta.id_tg)"
                :disabled="
                  formularioPropuesta.id_cde == '' ||
                  formularioPropuesta.titulo == '' 
                "
              >
                Aceptar
              </button>
              <button
                class="cancel"
                @click="rechazarTG(formularioPropuesta.id_tg)"
                :disabled="
                  formularioPropuesta.id_cde == '' ||
                  formularioPropuesta.id_cde === undefined ||
                  formularioPropuesta.id_cde == null ||
                  formularioPropuesta.titulo == '' ||
                  formularioPropuesta.observaciones_consejo == '' ||
                  formularioPropuesta.observaciones_consejo == undefined
                "
              >
                Rechazar
              </button>
            </div>
          </div>
        </form>
        <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
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
<style>
/*Esta etiqueta esta vacia*/
</style>
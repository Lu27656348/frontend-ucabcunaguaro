<script setup>
import Record from "../components/record.vue";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import * as jurados from "../modules/api/tg.js";

import { FormularioEmpresa } from "../modules/classes/formularioEmpresa.js";
//import { platform } from "os";

let dataPropuestas = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = reactive([]);

let planilla = ref({
  id_tg: "",
  titulo: "",
  modalidad: "",
  fecha_defensa: "",
  fecha_entrega_informe: "",
  id_tutor_academico: "",
  id_tutor_empresarial: "",
  j1: "",
  j2: "",
  j1_suplente: "",
  j2_suplente: "",
  nota1: "0",
  nota2: "0",
  nota_tutor: "0",
  showNotas: false,
  mencion: "",
  comentario_mencion: "",
  alumnos: [],
});

let dataFiltrada = reactive([]);
let dataFiltradaRealizaCedula = reactive([]);

let btnFiltrado = ref(false);
let btnFiltradoCedula = ref(false);
let btnFiltradoModalidad = ref(false);

const tituloParaFiltrar = ref(null);
const cedulaParaFiltrar = ref(null);
const modalidadParaFiltrar = ref(null);

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
      t.cedula_estudiante.includes(cedulaParaFiltrar.value)
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
  const respuesta = await api.obtenerTGById(id);
  const juradosTG = await jurados.obtenerJuradosDeTG(id);
  // console.log("clickenComponente()");
  // console.log("planilla");
  planilla.value.id_tg = respuesta.id_tg;
  planilla.value.titulo = respuesta.titulo;
  planilla.value.modalidad = respuesta.modalidad;
  planilla.value.id_tutor_academico = respuesta.id_tutor_academico;
  planilla.value.id_tutor_empresarial = respuesta.id_tutor_empresarial;
  planilla.value.j1 = juradosTG[0];
  planilla.value.j1_suplente = juradosTG[2];
  planilla.value.j2 = juradosTG[1];
  planilla.value.j2_suplente = juradosTG[3];

  planilla.value.alumnos = await api.obtenerEstudianteDeTG(
    planilla.value.id_tg
  );

  planilla.value.showNotas = true;
};

const descargarPlanillas = async () => {
  //console.log("Descargando planillas");
  console.log(planilla.value.alumnos);
  const respuesta = await api.defensaTrabajoDeGrado(
    planilla.value.id_tg,
    planilla.value.fecha_entrega_informe,
    planilla.value.fecha_defensa,
    planilla.value.mencion,
    planilla.value.comentario_mencion,
    planilla.value.alumnos
  );
  console.log("Respuesta");
  console.log(respuesta);
  planilla.value = {
    id_tg: "",
    titulo: "",
    modalidad: "",
    fecha_defensa: "",
    fecha_entrega_informe: "",
    id_tutor_academico: "",
    id_tutor_empresarial: "",
    j1: "",
    j2: "",
    j1_suplente: "",
    j2_suplente: "",
    nota1: "0",
    nota2: "0",
    nota_tutor: "0",
    showNotas: false,
    mencion: "",
    comentario_mencion: "",
    alumnos: [],
  };
  await pedirData();
};

const pedirData = async () => {
  dataPropuestas.value = await api.obtenerTGconJurado();
  dataFiltradaRealizaCedula.value = await api.obtenerTGconJuradoRealizaTG();
  dataFiltrada.value = dataPropuestas.value;
  dataConsejo.value = await api.obtenerCDE();
  dataEmpresas.value = await api.obtenerEmpresas();
};

onMounted(async () => {
  await pedirData();
});
</script>
<template>
  <div class="request">
    <h1>Cargado de Notas</h1>
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
            v-for="e in dataFiltrada.value"
            :key="e.id_tg"
            :id_tg="e.id_tg_formateado"
            :titulo="e.titulo"
            :fecha_solicitud="e.fecha_solicitud"
            :modalidad="e.modalidad"
            :estatus="e.estatus"
            @click="clickenComponente(e.id_tg)"
          />
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <!-- Aquí empieza la cabecera de la web -->

        <!--<form action="" class="committe__container__preview__form"> -->
        <h2>Visualización del documento de solicitud</h2>
        <div class="request__container__preview__form up-de">
          <div class="request__container__preview__form__inputs">
            <p>Titulo del Trabajo de Grado</p>
            <textarea
              disabled
              maxlength="200"
              v-model="planilla.titulo"
              class="request__container__preview__form__inputs--titulo-tg"
              placeholder="Tutilo de Propuesta TG"
            ></textarea>
            <p>Nota Final</p>
            <div
              class="estudiantesTg"
              v-for="e in planilla.alumnos"
              :key="e.cedula"
              style="margin-bottom: 15px;"
            >
              <p>{{ e.nombres + " " + e.apellidos }}</p>
              <input
                type="range"
                min="0"
                max="20"
                :disabled="planilla.id_tg == ''"
                v-model="e.nota"
              />
              <p>Nota seleccionada: {{ e.nota }}</p>
            </div>
            <p>Fecha de entrega del Informe Final</p>
            <input
              type="date"
              name="fechaEntrega"
              :disabled="planilla.id_tg == ''"
              v-model="planilla.fecha_entrega_informe"
            />
            <p>Fecha de defensa</p>
            <input
              type="date"
              name="fechaDefenza"
              :disabled="planilla.id_tg == ''"
              v-model="planilla.fecha_defensa"
            />
            <p v-show="planilla.alumnos.length > 0? planilla.alumnos[0].nota > 18? true: false : ''">Mencion</p>
            <select
              name="mencion"
              id=""
              v-show="planilla.alumnos.length > 0? planilla.alumnos[0].nota > 18? true: false : ''"
              v-model="planilla.mencion"
              :disabled="planilla.id_tg == ''"
            >
              <option :value="null">Sin Mencion</option>
              <option
                value="H"
                :disabled="
                  planilla.alumnos.length == 0
                    ? true
                    : planilla.alumnos[0].nota < 19 ||
                      planilla.alumnos[0].nota < 19 ||
                      planilla.alumnos.length == 1
                    ? false
                    : planilla.alumnos[1].nota < 19 ||
                      planilla.alumnos[1].nota < 19
                "
              >
                Honorifica
              </option>
              <option
                value="P"
                :disabled="
                  planilla.alumnos.length == 0
                    ? true
                    : planilla.alumnos[0].nota < 20 ||
                      planilla.alumnos[0].nota < 20 ||
                      planilla.alumnos.length == 1
                    ? false
                    : planilla.alumnos[1].nota < 20 ||
                      planilla.alumnos[1].nota < 20
                "
              >
                Publicacion
              </option>
            </select>
            <textarea
              v-if="!planilla.mencion == ''"
              v-show="planilla.alumnos.length > 0? planilla.alumnos[0].nota > 18? true: false : ''"
              maxlength="200"
              class="request__container__preview__form__inputs--titulo-tg"
              placeholder="Razon de la mencion"
              v-model="planilla.comentario_mencion"
              :disabled="planilla.id_tg == ''"
            ></textarea>
          </div>
          <div class="actions">
            <button
              class="succes"
              @click="descargarPlanillas()"
              :disabled="planilla.id_tg == ''"
            >
              Designar nota
            </button>
          </div>
        </div>
        <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        <!--</form> -->
        <!-- Aquí empieza la cabecera de la web -->
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
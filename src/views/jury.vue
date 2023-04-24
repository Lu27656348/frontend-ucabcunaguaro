<script setup>
import Record from "../components/record.vue";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

import { FormularioEmpresa } from "../modules/classes/formularioEmpresa.js";

/* Planillas de notificaciones */
import { notificacion_designacion_j } from "../modules/generadorDOCX/notificacion_designacion_j.js";
import { notificacion_designacion } from "../modules/generadorDOCX/notificacion_jurado.js";

/* Planillas para trabajo de grado experimental */
import { planilla_evaluacion_final_TEG } from "../modules/generadorDOCX/Planilla_evaluacion_final_TEG.js";
import { planilla_evaluacion_presentacion_oral_TEG } from "../modules/generadorDOCX/planilla_evaluacion_presentacion_oral.js";

/* Planillas para trabajo de grado instrumental */
import { planilla_evaluacion_TIG_TA } from "../modules/generadorDOCX/planilla_evaluacion_TIG_TA.js";
import { planilla_evaluacion_TIG_Jurado } from "../modules/generadorDOCX/planilla_evaluacion_TIG_Jurado.js";
import { planilla_evaluacion_final_TIG } from "../modules/generadorDOCX/Planilla_evaluacion_final_TIG.js";

let dataPropuestas = reactive([]);
let dataProfesores = reactive([]);

let profesoresDesignados = ref(["", "", "", ""]);

let planilla = ref({
  id_tg: "",
  titulo: "",
  modalidad: "",
  estatus: "",
  id_tutor_academico: "",
  id_tutor_empresarial: "",
  observaciones: "",
});

let consejoDeEscuela = reactive([]);
let cde = ref(null);

let dataFiltrada = reactive([]);
let dataFiltradaRealizaCedula = reactive([]);

let btnFiltrado = ref(false);
let btnFiltradoCedula = ref(false);
let btnFiltradoModalidad = ref(false);

const tituloParaFiltrar = ref(null);
const cedulaParaFiltrar = ref(null);
const modalidadParaFiltrar = ref(null);

let notificacion = ref({
  tg: "",
  alumnos: "",
  jurado1: "",
  jurado2: "",
  tutor_academico: "",
  tutor_empresarial: "",
  cde: "",
});

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

const designarJurado = async (profesores, id_tg) => {
  const jurado1 = await api.obtenerProfesorByCedula(
    profesoresDesignados.value[0]
  );
  const jurado2 = await api.obtenerProfesorByCedula(
    profesoresDesignados.value[1]
  );

  notificacion.value.jurado1 = jurado1;
  notificacion.value.jurado2 = jurado2;
  notificacion.value.cde = await api.obtenerCDEById(cde.value);

  /* La función crearJurado designa todos los jurados del trabajo de grado */

  await api.crearJurados(profesoresDesignados.value, id_tg);
  await api.designarCDEJurado(id_tg, cde.value, planilla.value.observaciones);

  /* Si la planilla es experimental */
  if (planilla.value.modalidad == "E") {
    planilla_evaluacion_presentacion_oral_TEG(notificacion.value);
    planilla_evaluacion_final_TEG(notificacion.value);
  } else {
    planilla_evaluacion_TIG_TA(notificacion.value);
    planilla_evaluacion_TIG_Jurado(notificacion.value);
    planilla_evaluacion_final_TIG(notificacion.value);
  }

  notificacion_designacion_j(notificacion.value);
  notificacion_designacion(notificacion.value);
  await pedirData();
};

const clickenComponente = async (id) => {
  const respuesta = await api.obtenerTGById(id);
  planilla.value.id_tg = respuesta.id_tg;
  planilla.value.id_tg_formateado = respuesta.id_tg_formateado;
  planilla.value.titulo = respuesta.titulo;
  planilla.value.modalidad = respuesta.modalidad;
  planilla.value.estatus = respuesta.estatus;
  planilla.value.id_tutor_academico = respuesta.id_tutor_academico;
  planilla.value.id_tutor_empresarial = respuesta.id_tutor_empresarial;

  const alumnosTG = await api.obtenerEstudianteDeTG(respuesta.id_tg);

  notificacion.value.alumnos = alumnosTG;
  notificacion.value.tg = planilla.value;

  notificacion.value.tutor_academico = await api.obtenerProfesorByCedula(
    planilla.value.id_tutor_academico
  );
  if (planilla.value.modalidad == "I") {
    notificacion.value.tutor_empresarial = await api.obtenerExternosById(
      planilla.value.id_tutor_empresarial
    );
  } else {
    notificacion.value.tutor_empresarial = null;
  }
  notificacion.value.tg = planilla.value;
  profesoresDesignados[0] = '';
  profesoresDesignados[1] = '';
  profesoresDesignados[2] = '';
  profesoresDesignados[3] = '';
  console.log(planilla.value.id_tutor_academico);
};

const pedirData = async () => {
  dataPropuestas.value = await api.obtenerTGsinJurado();
  dataFiltradaRealizaCedula.value = await api.obtenerTGSinJuradoAsignadoRealizaTG();
  dataFiltrada.value = dataPropuestas.value;
  consejoDeEscuela.value = await api.obtenerCDE();
  dataProfesores.value = await api.obtenerProfesores();
};

onMounted(async () => {
  await pedirData();
});
</script>
<template>
  <div class="request">
    <h1>Designar Jurado</h1>
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
        <div class="request__container__preview__form up-de">
          <input
            type="text"
            placeholder="Id TG"
            v-model="planilla.id_tg_formateado"
            disabled
          />
          <textarea
            disabled
            maxlength="200"
            v-model="planilla.titulo"
            class="request__container__preview__form__inputs--titulo-tg"
            placeholder="Tutilo de Propuesta TG"
          ></textarea>
          <div class="request__container__preview__form__inputs">
            <p>Jurado 1</p>
            <select name="profesor" id="" v-model="profesoresDesignados[0]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
                :style="
                  p.cedula != profesoresDesignados[0] &&
                  p.cedula != profesoresDesignados[1] &&
                  p.cedula != profesoresDesignados[2] &&
                  p.cedula != profesoresDesignados[3] &&
                  p.cedula != planilla.id_tutor_academico
                    ? 'display: inline'
                    : 'display: none'
                "
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
            <p>Jurado 2</p>
            <select name="profesor" id="" v-model="profesoresDesignados[1]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
                :style="
                  p.cedula != profesoresDesignados[0] &&
                  p.cedula != profesoresDesignados[1] &&
                  p.cedula != profesoresDesignados[2] &&
                  p.cedula != profesoresDesignados[3] &&
                  p.cedula != planilla.id_tutor_academico
                    ? 'display: inline'
                    : 'display: none'
                "
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
            <p>Jurado 1-suplente</p>
            <select name="profesor" id="" v-model="profesoresDesignados[2]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
                :style="
                  p.cedula != profesoresDesignados[0] &&
                  p.cedula != profesoresDesignados[1] &&
                  p.cedula != profesoresDesignados[2] &&
                  p.cedula != profesoresDesignados[3] &&
                  p.cedula != planilla.id_tutor_academico
                    ? 'display: inline;'
                    : 'display: none;'
                "
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
            <p>Jurado 2-suplente</p>
            <select name="profesor" id="" v-model="profesoresDesignados[3]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
                :style="
                  p.cedula != profesoresDesignados[0] &&
                  p.cedula != profesoresDesignados[1] &&
                  p.cedula != profesoresDesignados[2] &&
                  p.cedula != profesoresDesignados[3] &&
                  p.cedula != planilla.id_tutor_academico
                    ? 'display: inline'
                    : 'display: none'
                "
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
            <p>Consejo de escuela</p>
            <select name="cde" id="" v-model="cde">
              <option
                v-for="p in consejoDeEscuela.value"
                :key="p.id_cde"
                :value="p.id_cde"
              >
                {{ p.id_cde_formateado }}
              </option>
            </select>
            <textarea
              maxlength="200"
              v-model="planilla.observaciones"
              class="request__container__preview__form__inputs--titulo-tg"
              placeholder="Observaciones"
            ></textarea>
          </div>
          <div class="actions">
            <button
              class="succes"
              @click="designarJurado(profesoresDesignados, planilla.id_tg)"
              :disabled="
                profesoresDesignados[0] == '' ||
                profesoresDesignados[1] == '' ||
                profesoresDesignados[2] == '' ||
                profesoresDesignados[3] == '' ||
                planilla.id_tg == '' ||
                cde == null
              "
            >
              Designar Jurado
            </button>
          </div>
        </div>
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
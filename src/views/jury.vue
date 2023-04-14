<script setup>
import Record from "../components/record.vue";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

import { FormularioEmpresa } from "../modules/classes/formularioEmpresa.js";

/* Planillas de notificaciones */
import { notificacion_designacion_j } from '../modules/generadorDOCX/notificacion_designacion_j.js';
import { notificacion_designacion } from '../modules/generadorDOCX/notificacion_jurado.js';

/* Planillas para trabajo de grado experimental */
import { planilla_evaluacion_final_TEG } from '../modules/generadorDOCX/Planilla_evaluacion_final_TEG.js';
import { planilla_evaluacion_presentacion_oral_TEG } from '../modules/generadorDOCX/planilla_evaluacion_presentacion_oral.js';

/* Planillas para trabajo de grado instrumental */
import { planilla_evaluacion_TIG_TA } from '../modules/generadorDOCX/planilla_evaluacion_TIG_TA.js';
import { planilla_evaluacion_TIG_Jurado } from '../modules/generadorDOCX/planilla_evaluacion_TIG_Jurado.js';
import { planilla_evaluacion_final_TIG } from '../modules/generadorDOCX/Planilla_evaluacion_final_TIG.js';

let data = reactive([]);
let dataProfesores = reactive([]);

let profesoresDesignados = ref(["", "", "", ""]);

let planilla = ref({
  id_tg: "",
  titulo: "",
  modalidad: "",
  estatus: "",
  id_tutor_academico: "",
  id_tutor_empresarial: "",
  observaciones: ""
});

let consejoDeEscuela = reactive([]);
let cde = ref(null)

let notificacion = ref({
        tg: '',
        alumnos: '',
        jurado1: '',
        jurado2: '',
        tutor_academico: '',
        tutor_empresarial: '',
        cde: ''
});

const designarJurado = async (profesores, id_tg) => {
  const jurado1 = await api.obtenerProfesorByCedula(profesoresDesignados.value[0]);
  const jurado2 = await api.obtenerProfesorByCedula(profesoresDesignados.value[1]);

  notificacion.value.jurado1 = jurado1;
  notificacion.value.jurado2 = jurado2;
  notificacion.value.cde = await api.obtenerCDEById(cde.value)

  /* La función crearJurado designa todos los jurados del trabajo de grado */
  await api.crearJurados(profesoresDesignados.value, id_tg);
  await api.designarCDEJurado(id_tg,cde.value,planilla.value.observaciones);

  /* Si la planilla es experimental */
  if (planilla.value.modalidad == 'E'){

  planilla_evaluacion_presentacion_oral_TEG(notificacion.value)
  planilla_evaluacion_final_TEG(notificacion.value);

  }else{

  planilla_evaluacion_TIG_TA(notificacion.value);
  planilla_evaluacion_TIG_Jurado(notificacion.value);
  planilla_evaluacion_final_TIG(notificacion.value); 

  }

  notificacion_designacion_j(notificacion.value);
  notificacion_designacion(notificacion.value);
  data.value = await api.obtenerTGsinJurado();

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

  notificacion.value.tutor_academico = await api.obtenerProfesorByCedula(planilla.value.id_tutor_academico);
  if(planilla.value.modalidad == 'I'){
    notificacion.value.tutor_empresarial = await api.obtenerExternosById(planilla.value.id_tutor_empresarial);
  }else{
    notificacion.value.tutor_empresarial = null;
  }
  notificacion.value.tg = planilla.value;
};

const pelliscar = ()=>{
  // Usame como funcion de prueba
}

onMounted(async () => {
  data.value = await api.obtenerTGsinJurado();
  dataProfesores.value = await api.obtenerProfesores();
  console.log(dataProfesores.value);
  console.log(profesoresDesignados.value);
  consejoDeEscuela.value = await api.obtenerCDE();
});
</script>
<template>
  <div class="request">
    <h1>Designar Jurado</h1>
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
            v-for="e in data.value"
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
          <input type="text" placeholder="Id TG" v-model="planilla.id_tg_formateado">
          <textarea
            disabled
            maxlength="200"
            v-model="planilla.titulo"
            class="request__container__preview__form__inputs--titulo-tg"
            placeholder="Tutilo de Propuesta TG"
          ></textarea>
          <div class="request__container__preview__form__inputs">
            <p>J1</p>
            <select name="profesor" id="" v-model="profesoresDesignados[0]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
                :style="
                  p.cedula != profesoresDesignados[0] &&
                  p.cedula != profesoresDesignados[1] &&
                  p.cedula != profesoresDesignados[2] &&
                  p.cedula != profesoresDesignados[3]? 'display: inline' : 'display: none'
                "
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
            <p>J2</p>
            <select name="profesor" id="" v-model="profesoresDesignados[1]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
                :style="
                  p.cedula != profesoresDesignados[0] &&
                  p.cedula != profesoresDesignados[1] &&
                  p.cedula != profesoresDesignados[2] &&
                  p.cedula != profesoresDesignados[3]? 'display: inline' : 'display: none'
                "
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
            <p>J1-suplente</p>
            <select name="profesor" id="" v-model="profesoresDesignados[2]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
                :style="
                  p.cedula == profesoresDesignados[0] ||
                  p.cedula == profesoresDesignados[1] ||
                  p.cedula == profesoresDesignados[2] ||
                  p.cedula == profesoresDesignados[3]? 'display: none;' : 'display: inline;'
                "
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
            <p>J2-suplente</p>
            <select name="profesor" id="" v-model="profesoresDesignados[3]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
                :style="
                  p.cedula != profesoresDesignados[0] &&
                  p.cedula != profesoresDesignados[1] &&
                  p.cedula != profesoresDesignados[2] &&
                  p.cedula != profesoresDesignados[3]? 'display: inline' : 'display: none'
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
                profesoresDesignados[0]=='' ||
                profesoresDesignados[1]=='' ||
                profesoresDesignados[2]=='' ||
                profesoresDesignados[3]=='' ||
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
  </div>
</template>
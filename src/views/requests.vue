<script setup>
import Record from "../components/record.vue";
import crearSolicitud from "../components/planillaSolicitudCrear.vue";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { PlanillaPropuestaTEG } from "../modules/classes/planillaPropuestaTEG.js";
import { PlanillaPropuestaTIG } from "../modules/classes/planillaPropuestaTIG.js";

let data = reactive([]);
let dataFiltrada = reactive([]);

// Objeto para guardar los datos de la planilla que se esta leyendo
let planilla = ref({
  id_tg: "",
  titulo: "",
  modalidad: "",
  estatus: "",
  id_tutor_academico: "",
  id_tutor_empresarial: "",
});

let btnFiltrado = ref(false);

const showPlanillaUpDe = ref(false);
const showPlanillaCreate = ref(false);
const actualizarLista = ref(false);
const tituloParaFiltrar = ref(null);

function actionShowPlanillaCrear() {
  showPlanillaUpDe.value = false;
  showPlanillaCreate.value = true;
}
function actionShowPlanillaUpDe() {
  showPlanillaUpDe.value = true;
  showPlanillaCreate.value = false;
}

function showFiltrado() {
  btnFiltrado.value = !btnFiltrado.value;
}

function filtrarLista(){
  dataFiltrada.value = data.value.filter((t) => t.titulo.includes(tituloParaFiltrar.value));
  console.log(dataFiltrada.value);
}

const clickenComponente = async (id) => {
  actionShowPlanillaUpDe();
  const respuesta = await api.obtenerTGById(id);
  console.log("clickenComponente()");
  console.log("planilla");
  planilla.value.id_tg = respuesta.id_tg;
  planilla.value.id_tg_formateado = respuesta.id_tg_formateado;
  planilla.value.titulo = respuesta.titulo;
  planilla.value.modalidad = respuesta.modalidad;
  planilla.value.estatus = respuesta.estatus;
  planilla.value.id_tutor_academico = respuesta.id_tutor_academico;
  planilla.value.id_tutor_empresarial = respuesta.id_tutor_empresarial;
  console.log(planilla.value);
};

const regenerarPlanilla = async () => {
  console.log("regenerarPlanilla()")
  const trabajo_de_grado = await api.obtenerTGById(planilla.value.id_tg);
  const alumnos = await api.obtenerEstudianteDeTG(planilla.value.id_tg);
  const empresa = await api.obtenerEmpresaById(trabajo_de_grado.id_empresa);
  console.log(trabajo_de_grado);
  console.log(alumnos);
  console.log(empresa);
  if(trabajo_de_grado.modalidad == 'E'){
    const tutor_academico = await api.obtenerProfesorByCedula(trabajo_de_grado.id_tutor_academico)
    console.log(tutor_academico)
    let planillaGenerada = new PlanillaPropuestaTEG(trabajo_de_grado.titulo, empresa.nombre,empresa,tutor_academico);
    planillaGenerada.añadirAlumno(alumnos[0]);
    if(alumnos[1] != null && alumnos[1] != undefined){
      planillaGenerada.añadirAlumno(alumnos[1]);
    }
    planillaGenerada.imprimir();
  }else{
    const tutor_empresarial = await api.obtenerExternosById(trabajo_de_grado.id_tutor_empresarial);
    console.log(tutor_empresarial)
    let planillaGenerada = new PlanillaPropuestaTIG(trabajo_de_grado.titulo, empresa.nombre,empresa,tutor_empresarial);
    planillaGenerada.añadirAlumno(alumnos[0]);
    if(alumnos[1] != null && alumnos[1] != undefined){
      planillaGenerada.añadirAlumno(alumnos[1]);
    }
    planillaGenerada.imprimir();
  }
 
} 


async function pedirData(){
  data.value = await api.obtenerPropuestas("PC");
  dataFiltrada.value = data.value;
}

async function actualizarPlanilla() {
  console.log(planilla.value);
  await api.actualizarPlanilla(planilla.value);
  await pedirData();
  await pedirData();
}

async function eliminarPlanilla() {
  console.log("Eliminando planilla");
  const eliminar = await api.eliminarPlanilla(planilla.value.id_tg);
  await pedirData();
  await pedirData();
}
onMounted(async () => {
  data.value = await api.obtenerPropuestas("PC");
  dataFiltrada.value = data.value;
});

//------------------------------------------------------>
</script>

<template>
  <div class="request">
    <div class="request__container__display__controllers">
      <button class="succes">
        <ion-icon name="person-circle-outline"></ion-icon>Buscar Estudiante
      </button>
      <button @click="showFiltrado()" class="succes">
        <ion-icon name="bulb-outline"></ion-icon>Buscar Propuesta
      </button>
      <button class="succes">
        <ion-icon name="cog-outline"></ion-icon>Buscar Modalidad
      </button>
      <button @click="actionShowPlanillaCrear()">
        <img src="../assets/imgs/add-circle-outline.svg" alt="" />Crear Planilla
      </button>
    </div>
    <div class="container request__container">
      <!-- Colocar un nuevo contenedor para el filtrado -->
      <div class="request__container__display">
        <div class="request__container__display__list">
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

      <div class="request__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form
          class="request__container__preview__form up-de"
          @submit.prevent="submit"
          v-show="showPlanillaUpDe"
        >
          <div class="request__container__preview__form__inputs">
            <p>Codigo de Trabajo de Grado</p>
            <input
              disabled
              type="text"
              v-model="planilla.id_tg_formateado"
              name=""
              id=""
            />
            <p>Titulo de Trabajo de Grado</p>
            <textarea
              maxlength="200"
              v-model="planilla.titulo"
              class="request__container__preview__form__inputs--titulo-tg"
              placeholder="Tutilo de Propuesta TG"
            ></textarea>
            <p for="">Modalidad</p>
            <select name="modalidad" id="" v-model="planilla.modalidad">
              <option value="E">Experimental</option>
              <option value="I">Instrumental</option>
            </select>
          </div>
          <div class="actions">
            <button type="submit" @click="actualizarPlanilla(planilla.id_tg)">
              Actualizar planilla
            </button>
            <button 
              class="cancel" 
              @click="eliminarPlanilla(planilla.id_tg)"
            >
              Eliminar planilla
            </button>
            <button
              @click="regenerarPlanilla()"
            >
              Descargar Planilla
            </button>
          </div>
        </form>

        <crearSolicitud
          :showPlanillaCreate="showPlanillaCreate"
          @refrescar="pedirData"
        />
      </div>
    </div>
    <div
      class="filter-form"
      v-if="btnFiltrado"
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: aqua;
        padding: 15px;
        "
    >
      <p>Digite el Titulo de Trabajo de Grado</p>
      <input type="text" v-model="tituloParaFiltrar" placeholder="Titulo de Trabajo de Grado">
      <button @click="filtrarLista()">Buscar propuesta</button>
    </div>
  </div>
</template>
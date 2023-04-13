<script setup>
import Record from "../components/record.vue";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import * as jurados from "../modules/api/tg.js";

import { FormularioEmpresa } from "../modules/classes/formularioEmpresa.js";
//import { platform } from "os";

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = reactive([]);

let planilla = ref({
  id_tg: "",
  titulo: "",
  modalidad: "",
  fecha_defensa: '',
  fecha_entrega_informe: '',
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
  mencion: '',
  comentario_mencion: '',
  alumnos: []
});

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

  planilla.value.alumnos = await api.obtenerEstudianteDeTG(planilla.value.id_tg);

  planilla.value.showNotas = true;
};

const descargarPlanillas = async () => {
  //console.log("Descargando planillas");
  console.log(planilla.value.alumnos)
  const respuesta = await api.defensaTrabajoDeGrado(planilla.value.id_tg, planilla.value.fecha_entrega_informe, planilla.value.fecha_defensa, planilla.value.mencion, planilla.value.comentario_mencion, planilla.value.alumnos);
  console.log("Respuesta");
  console.log(respuesta);
  planilla.value = {
  id_tg: "",
  titulo: "",
  modalidad: "",
  fecha_defensa: '',
  fecha_entrega_informe: '',
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
  mencion: '',
  comentario_mencion: '',
  alumnos: []
}
data.value = await api.obtenerTGconJurado();
};

onMounted(async () => {
  data.value = await api.obtenerTGconJurado();
  dataConsejo.value = await api.obtenerCDE();
  dataEmpresas.value = await api.obtenerEmpresas();
});
</script>
<template>
  <div class="request">
    <h1>Cargado de Notas</h1>
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
        <!-- Aquí empieza la cabecera de la web -->
      
         <!--<form action="" class="committe__container__preview__form"> -->
          <h2>Visualización del documento de solicitud</h2>
          <div class="request__container__preview__form up-de">
            <div class="request__container__preview__form__inputs">
              <textarea
                disabled
                maxlength="200"
                v-model=planilla.titulo
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Tutilo de Propuesta TG"
              ></textarea>
              <p>Nota Final</p>
              <div 
                class="estudiantesTg"
                v-for="e in planilla.alumnos"
                :key="e.cedula"
              >
                <p>{{ e.nombres + ' ' + e.apellidos }}</p>
                <input
                  type="range" 
                  min="0" 
                  max="20" 
                  :disabled="planilla.id_tg == ''" v-model="e.nota" 
                />
                <p>{{ e.nota }}</p>
              </div>
              <p>Fecha de entrega del Informe Final</p>
              <input type="date" name="fechaEntrega" :disabled="planilla.id_tg == ''" v-model="planilla.fecha_entrega_informe" >
              <p>Fecha de defensa</p>
              <input type="date" name="fechaDefenza" :disabled="planilla.id_tg == ''" v-model="planilla.fecha_defensa">
              <p>Mencion</p>
              <select name="mencion" id="" v-model="planilla.mencion" :disabled="planilla.id_tg == ''">
                <option :value="null">Sin Mencion</option>
                <option 
                  value="H"
                  :disabled = "
                    planilla.alumnos.length == 0? true : planilla.alumnos[0].nota < 18 || planilla.alumnos[0].nota < 18 ||
                    planilla.alumnos.length == 1? false : planilla.alumnos[1].nota < 18 || planilla.alumnos[1].nota < 18
                  "
                  >Honorifica</option>
                <option 
                  value="P"
                  :disabled = "
                    planilla.alumnos.length == 0? true : planilla.alumnos[0].nota < 19 || planilla.alumnos[0].nota < 19  ||
                    planilla.alumnos.length == 1? false : planilla.alumnos[1].nota < 19 || planilla.alumnos[1].nota < 19
                  "
                  >Publicacion</option>
              </select>
              <textarea
                v-if="!planilla.mencion == ''"
                maxlength="200"
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Razon de la mencion"
                v-model="planilla.comentario_mencion"
                :disabled="planilla.id_tg == ''"
              ></textarea>
            </div>
            <div class="actions">
              <button
                class="login__form__btn succes"
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
  </div>
</template>
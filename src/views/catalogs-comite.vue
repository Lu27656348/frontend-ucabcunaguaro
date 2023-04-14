<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { async } from "@firebase/util";

let data = reactive([]);

let comite = ref({
  id_ctg: '',
  id_ctg_formateado: '',
  fecha_conformacion: '',
  resumen_ctg: ''
});

let crearComite = ref(false);

const clickenComponente = async (id) => {
  const comiteRequest = await api.obtenerComitesByID(id);
  comite.value.id_ctg = comiteRequest.id_ctg;
  comite.value.id_ctg_formateado = comiteRequest.id_ctg_formateado;
  comite.value.fecha_conformacion = comiteRequest.fecha_conformacion;
  comite.value.resumen_ctg = comiteRequest.resumen_ctg;
  
  crearComite.value = false;
}

const clickCrear = () => {
  comite.value.id_ctg = '';
  comite.value.id_ctg_formateado = '';
  comite.value.fecha_conformacion = '';
  comite.value.resumen_ctg = '';

  crearComite.value = true;
};

const añadirComite = async () => {
    await api.añadirComite(comite.value);
    data.value = await api.obtenerCTG();
}
const actualizarComite = async () => {
    await api.actualizarComite(comite.value);
    data.value = await api.obtenerCTG();
}

const eliminarComite = async () => {
    await api.eliminarComite(comite.value.id_ctg)
    data.value = await api.obtenerCTG();
}
onMounted(async () => {
  data.value = await api.obtenerCTG();
  console.log(data.value);
});

</script>
<template>
  <div class="request">
    <h1>Catalogo de Comites</h1>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__controllers">
          <button>
            <img src="../assets/imgs/search-circle-outline.svg" />Buscar
            Solicitud
          </button>
          <button @click="clickCrear()">
            <img src="../assets/imgs/add-circle-outline.svg" alt="" />Crear
            Comite
          </button>
        </div>
        <div class="committe__container__display__list">
          <!-- Aqui va el registro para las propuestas de trabajo de grado -->
          <div
            class="request__container__display__list__record"
            v-for="e in data.value" 
            :key="e.id_ctg"
            @click="clickenComponente(e.id_ctg)"
          >
            <p>ID: {{ e.id_ctg }}</p>
            <p>ID Formateado: {{ e.id_ctg_formateado }}</p>
            <p>Fecha de Conformacion: {{ e.fecha_conformacion }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
          <div class="committe__container__preview__form">
       <!--  <form action="" class="committe__container__preview__form"> -->
          <div class="request__container__preview__form up-de">
            <p>ID Comite</p>
            <input type="text" v-model="comite.id_ctg">
            <p>ID Formateado</p>
            <input type="text" v-model="comite.id_ctg_formateado" disabled>
            <p>Fecha de Conformacion</p>
            <input type="date" v-model="comite.fecha_conformacion">
            <p>Resumen de Comite</p>
            <input type="text" v-model="comite.resumen_ctg">
            <div class="actions">
              <button 
                class="succes" 
                @click="añadirComite()"
                v-show="crearComite"
              >
                Añadir Comite
              </button>
              <button 
                class="succes" 
                @click="actualizarComite()"
                v-show="!crearComite"
              >
                Actualizar Comite
              </button>
              <button 
                class="cancel" 
                @click="eliminarComite()"
                v-show="!crearComite"
              >
                Eliminar Comite
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
       <!-- </form> -->
      </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { EmailAuthCredential } from "firebase/auth";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

let data = reactive([]);

let consejo = ref({
  id_cde: "",
  id_cde_formateado: "",
  fecha_conformacion: "",
});

let crearConsejo = ref(false);

const clickenComponente = async (id) => {
  const consejoRequest = await api.obtenerCDEById(id);
  consejo.value.id_cde = consejoRequest.id_cde;
  consejo.value.id_cde_formateado = consejoRequest.id_cde_formateado;
  consejo.value.fecha_conformacion = consejoRequest.fecha_conformacion;

  crearConsejo.value = false;
};

const clickCrear = () => {
  consejo.value.id_cde = "";
  consejo.value.id_cde_formateado = "";
  consejo.value.fecha_conformacion = "";

  crearConsejo.value = true;
};

const añadirConsejo = async () => {
  await api.añadirCDE(consejo.value);
  data.value = await api.obtenerCDE();
};

const actualizarConsejo = async () => {
  await api.actualizarCDE(consejo.value);
  data.value = await api.obtenerCDE();
};

const eliminarConsejo = async () => {
  await api.eliminarCDE(consejo.value.id_cde);
  data.value = await api.obtenerCDE();
};
onMounted(async () => {
  data.value = await api.obtenerCDE();
  console.log(data.value);
});
</script>
<template>
  <div class="request">
    <h1>Catalogo de Consejos de Escuela</h1>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__controllers">
          <button>
            <img src="../assets/imgs/search-circle-outline.svg" />Buscar
            Solicitud
          </button>
          <button @click="clickCrear()">
            <img src="../assets/imgs/add-circle-outline.svg" alt="" />Crear
            Consejo
          </button>
        </div>
        <div class="committe__container__display__list">
          <!-- Aqui va el registro para las propuestas de trabajo de grado -->
          <div
            class="request__container__display__list__record"
            v-for="e in data.value"
            :key="e.id_cde"
            @click="clickenComponente(e.id_cde)"
          >
            <p>ID: {{ e.id_cde }}</p>
            <p>ID Formateado: {{ e.id_cde_formateado }}</p>
            <p>Fecha Conformacion: {{ e.fecha_conformacion }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <div class="committe__container__preview__form">
          <!-- <form action="" class="committe__container__preview__form"> -->
          <div class="request__container__preview__form up-de">
            <p>ID Consejo de Escuela</p>
            <input type="text" v-model="consejo.id_cde" />
            <p>ID Formateado</p>
            <input type="text" v-model="consejo.id_cde_formateado" disabled />
            <p>Fecha de Conformacion</p>
            <input type="date" v-model="consejo.fecha_conformacion" />
            <div class="actions">
              <button 
                class="login__form__btn succes" 
                @click="añadirConsejo()"
                v-show="crearConsejo"
              >
                Añadir Consejo
              </button>
              <button
                @click="actualizarConsejo()"
                class="login__form__btn succes"
                v-show="!crearConsejo"
              >
                Actualizar Consejo
              </button>
              <button
                @click="eliminarConsejo()"
                class="login__form__btn cancel"
                v-show="!crearConsejo"
              >
                Eliminar Consejo
              </button>
            </div>
          </div>
        </div>
        <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        <!-- </form> -->
      </div>
    </div>
  </div>
</template>
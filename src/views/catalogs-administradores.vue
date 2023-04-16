<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

let dataAdministradores = reactive([]);
let dataProfesores = reactive([]);

let profesoresDisponibles = reactive([]);

let administrador = ref({
  cedula: '',
  nombres: '',
  apellidos: '',
  id: '',
  password: '',
  confirmPassword: ''
});

onMounted(async () => {
  dataAdministradores.value = await api.obtenerProfesores();
  dataProfesores.value = await api.obtenerProfesores();
  console.log(data.value);
});

</script>
<template>
  <div class="request">
    <h1>Catalogo de Areas de Especialidades</h1>
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
          <div
            class="request__container__display__list__record"
            v-for="e in dataProfesores.value" 
            :key="e.cedula"
          >
            <p>ID: {{ e.cedula }}</p>
            <p>Apellidos: {{ e.apellidos }}</p>
            <p>Nombres: {{ e.nombres }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form action="" class="committe__container__preview__form">
          <div class="request__container__preview__form up-de">
            <p>Cedula</p>
            <input type="text" v-model="administrador.cedula">
            <p>Apellidos</p>
            <input type="text" v-model="administrador.apellidos">
            <p>Nombres</p>
            <input type="text" v-model="administrador.nombres">
            <p>Usuario</p>
            <input type="text" v-model="administrador.id">
            <p>Constraseña</p>
            <input minlength="8" maxlength="14" type="text" v-model="administrador.password">
            <p>Confirmar Constraseña</p>
            <input minlength="8" maxlength="14" type="text" v-model="administrador.confirmPassword">
            <div class="actions">
              <button 
                class="succes" 
                :disabled="
                  administrador.cedula === '' ||
                  administrador.apellidos === '' ||
                  administrador.nombres === '' ||
                  administrador.id === '' ||
                  administrador.password === '' ||
                  administrador.confirmPassword ==='' ||
                  administrador.password.length < 8 ||
                  administrador.confirmPassword !== administrador.password
                "
              >
                Añadir Administrador
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </form>
      </div>
    </div>
  </div>
</template>
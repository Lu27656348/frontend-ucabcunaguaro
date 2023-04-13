<script setup>

import { reactive } from 'vue';
import * as api from '../modules/apiTools.js';


let estudiante = reactive({
  cedula: '',
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  oficina: '',
  habitacion: ''
});

const insertarEstudiante = () =>{
  api.insertarEstudiantes(estudiante);
};

</script>
<template>
  <div class="request">
    <h1>Designacion de tutor academico ( Consejo )</h1>
    
    <form
          class="request__container__preview__form up-de"
          @submit.prevent="submit"
        >
          <div class="request__container__preview__form__inputs">
            <p for="">Titulo del Trabajo</p>
            <input v-model="estudiante.cedula" type="text" placeholder="Cedula del estudiante">
            <input v-model="estudiante.nombres" type="text" placeholder="Nombres del estudiante">
            <input v-model="estudiante.apellidos" type="text" placeholder="Apellido del estudiante">
            <input v-model="estudiante.email" type="text" placeholder="Email del estudiante">
            <input v-model="estudiante.telefono" type="text" placeholder="Telefono del estudiante">
            <input v-model="estudiante.oficina" type="text" placeholder="Oficina del estudiante">
            <input v-model="estudiante.habitacion" type="text" placeholder="habitacion del estudiante">
            <button @click="insertarEstudiante()" class="succes"> Insertar Estudiante </button>
          </div>
        </form>
  </div>
</template>
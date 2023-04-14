<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

import { FormularioEmpresa } from "../modules/classes/formularioEmpresa.js";

let dataEmpresas = ref([]);

onMounted(async () => {
  dataEmpresas.value = await api.obtenerEmpresas();
});

let crearEmpresa = ref(new FormularioEmpresa());

let mostrarCrearEmpresa = ref(false);

const clickenComponente = async (id) => {
  const empresaRequest = await api.obtenerEmpresaById(id);
  crearEmpresa.value.id_empresa = empresaRequest.id_empresa;
  crearEmpresa.value.nombre = empresaRequest.nombre;
  crearEmpresa.value.direccion = empresaRequest.direccion;
  crearEmpresa.value.telefono = empresaRequest.telefono;

  mostrarCrearEmpresa.value = false;

  console.log(empresaRequest);
};

const clickCrear = () => {
  crearEmpresa.value.id_empresa = "";
  crearEmpresa.value.nombre = "";
  crearEmpresa.value.direccion = "";
  crearEmpresa.value.telefono = "";

  mostrarCrearEmpresa.value = true;
};

const añadirEmpresa = async () => {
  console.log("AñadirEmpresa()");
  await api.crearEmpresa(crearEmpresa.value);
  dataEmpresas.value = await api.obtenerEmpresas();
  crearEmpresa.value.nombre = "";
  crearEmpresa.value.direccion = "";
  crearEmpresa.value.telefono = "";
  dataEmpresas.value = await api.obtenerEmpresas();
};
const actualizarEmpresa = async () => {
  console.log("actualizarEmpresa()");
  await api.actualizarEmpresa(crearEmpresa.value);
  dataEmpresas.value = await api.obtenerEmpresas();
};
const eliminarEmpresa = async () => {
  console.log("eliminarEmpresa()");
  await api.eliminarEmpresa(crearEmpresa.value.id_empresa);
  dataEmpresas.value = await api.obtenerEmpresas();
};
</script>
<template>
  <div class="request">
    <h1>Crear una empresa</h1>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__controllers">
          <button>
            <img src="../assets/imgs/search-circle-outline.svg" />Buscar
            Solicitud
          </button>
          <button @click="clickCrear()">
            <img src="../assets/imgs/add-circle-outline.svg" alt="" />Crear
            Empresa
          </button>
        </div>
        <div class="committe__container__display__list">
          <!-- Aqui va el registro para las propuestas de trabajo de grado -->
          <div
            class="request__container__display__list__record"
            v-for="e in dataEmpresas"
            :key="e.id_empresa"
            @click="clickenComponente(e.id_empresa)"
          >
            <p>ID: {{ e.id_empresa }}</p>
            <p>Nombre: {{ e.nombre }}</p>
            <p>Direccion: {{ e.direccion }}</p>
            <p>Telefono: {{ e.telefono }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form
          action=""
          class="committe__container__preview__form"
          @submit.prevent="añadirEmpresa()"
        >
          <div class="request__container__preview__form up-de">
            <p>Nombre Empresa</p>
            <input
              type="text"
              placeholder="Nombre Empresa"
              v-model="crearEmpresa.nombre"
            />
            <p>Direccion</p>
            <input
              type="text"
              placeholder="Direccion"
              v-model="crearEmpresa.direccion"
            />
            <p>Telefono</p>
            <input
              type="text"
              placeholder="Telefono"
              v-model="crearEmpresa.telefono"
            />
            <div class="actions">
              <button
                class="succes"
                type="submit"
                v-show="mostrarCrearEmpresa"
                :disabled="
                  crearEmpresa.nombre == '' ||
                  crearEmpresa.direccion == '' ||
                  crearEmpresa.telefono == ''
                "
              >
                Añadir Empresa
              </button>
              <button
                class="succes"
                @click="actualizarEmpresa()"
                type="button"
                v-show="!mostrarCrearEmpresa"
                :disabled="
                  crearEmpresa.nombre == '' ||
                  crearEmpresa.direccion == '' ||
                  crearEmpresa.telefono == ''
                "
              >
                Actualizar Empresa
              </button>
              <button
                class="cancel"
                type="button"
                v-show="!mostrarCrearEmpresa"
                @click="eliminarEmpresa()"
                :disabled="
                  crearEmpresa.nombre == '' ||
                  crearEmpresa.direccion == '' ||
                  crearEmpresa.telefono == ''
                "
              >
                Elininar Empresa
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </form>
      </div>
    </div>
  </div>
</template>
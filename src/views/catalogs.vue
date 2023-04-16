<script setup>
import { onMounted, ref } from "vue";
console.log("Estoy corriendo");
</script>
<template>
  <div class="request">
    <h1>Consejo de escuela</h1>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__controllers">
          <button>
            <img src="../assets/imgs/search-circle-outline.svg" />Buscar
            Solicitud
          </button>
        </div>
        <ul class="committe__container__display__list">
          <!-- Aqui va el registro para las propuestas de trabajo de grado -->
          <li class="request__container__display__list__record">
            <router-link to="/catalogs/admins"><ion-icon name="book-outline"></ion-icon> Administradores</router-link>
          </li>
          <li class="request__container__display__list__record">
            <router-link to="/catalogs/estudiantes"><ion-icon name="book-outline"></ion-icon> Estudiantes</router-link>
          </li>
          <li class="request__container__display__list__record"   >
            <router-link to="/catalogs/profesores"><ion-icon name="book-outline"></ion-icon> Profesores</router-link>
          </li>
          <li class="request__container__display__list__record"   >
            <router-link to="/catalogs/empresas"><ion-icon name="book-outline"></ion-icon> Empresas</router-link>
          </li>
          <li class="request__container__display__list__record"   >
            <router-link to="/catalogs/externos"><ion-icon name="book-outline"></ion-icon> Externos</router-link>
          </li>
          <li class="request__container__display__list__record"   >
          <router-link to="/catalogs/consejo"><ion-icon name="book-outline"></ion-icon> Consejo</router-link>
          </li>
          <li class="request__container__display__list__record"   >
            <router-link to="/catalogs/comite"><ion-icon name="book-outline"></ion-icon> Comite</router-link>
          </li>
        </ul>
      </div>
      <div class="committe__container__preview">
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const props = defineProps({
  cerrarSesion: Function
});

/*
onMounted((user) => {
  if (user) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
});
*/
</script>
<template>
  <div class="navbar">
    <img src="../assets/ucab - isotipo.png" alt="" />
    <ul class="navbar__list">
      <li class="navbar__list__element">
        <router-link to="/requests"
          ><ion-icon name="bulb-outline"></ion-icon> Propuesta</router-link
        >
      </li>
      <li class="navbar__list__element">
        <router-link to="/committee"
          ><ion-icon name="layers-outline"></ion-icon> Comité</router-link
        >
      </li>
      <li class="navbar__list__element">
        <router-link to="/reviewers"
          ><ion-icon name="person-outline"></ion-icon> Revisor</router-link
        >
      </li>
      <li class="navbar__list__element">
        <router-link to="/reviewers_evaluation"
          ><ion-icon name="search-circle-outline"></ion-icon>
          Revisión</router-link
        >
      </li>
      <li class="navbar__list__element">
        <router-link to="/consejo"
          ><ion-icon name="people-outline"></ion-icon> Consejo</router-link
        >
      </li>
      <li class="navbar__list__element">
        <router-link to="/assignment"
          ><ion-icon name="person-add-outline"></ion-icon> Tutor</router-link
        >
      </li>
      <li class="navbar__list__element">
        <router-link to="/designarJurado"
          ><ion-icon name="cafe-outline"></ion-icon> Jurados</router-link
        >
      </li>
      <li class="navbar__list__element">
        <router-link to="/evaluacionNotas"
          ><ion-icon name="shield-checkmark-outline"></ion-icon> Defensa
          TG</router-link
        >
      </li>
      <li class="navbar__list__element">
        <router-link to="/catalogs"
          ><ion-icon name="book-outline"></ion-icon> Catalogos</router-link
        >
      </li>
      <li class="navbar__list__element">
        <button class="login__form--btn cancel" @click="props.cerrarSesion()">Cerrar sesion</button>
      </li>
    </ul>
  </div>
</template>
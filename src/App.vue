<script setup>
import { async } from "@firebase/util";
import { ref } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();

let logged = ref(false);

if(localStorage.getItem("usuario") != null){
  logged.value = true;
}
const sesion = ref({
  user: "",
  password: "",
  access_token:"",
  role: "",
  isSigned: false,
});

const moverRequest =async (usuario) => {
  localStorage.setItem("usuario", JSON.stringify(sesion.value));
  router.push("/requests");
  logged.value = true;
};
const moverLogin = () => {
  localStorage.clear();
  router.push("/");
  logged.value = false;
};
</script>

<template>
  <div  v-if="logged" class="navbar">
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
        <button @click="moverLogin()">Cerrar sesion</button>
      </li>
    </ul>
  </div>
  <router-view
    id="router"
    class="router"
    :iniciarSesion="moverRequest"
  ></router-view>
</template>
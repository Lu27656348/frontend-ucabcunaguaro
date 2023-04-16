<script setup>
import { async } from "@firebase/util";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as api from '../modules/apiTools.js'
const props = defineProps({
  iniciarSesion: Function
});

const cedula = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref(""); //Mensaje de error
const sesion = ref({
  user: "",
  password: "",
  access_token: "",
  role: "",
  isSigned: false,
});
const extraerDatosLogin = async () => {
  console.log("extraerDatosLogin()");
  console.log("Cedula: ", cedula.value);
  console.log("Contraseña: ", password.value);
  const usuario = await api.buscarAdministradores(cedula.value.toString(),password.value.toString())
  console.log(usuario)
  if(usuario != null && usuario != undefined){
    props.iniciarSesion();
  }else{
    console.log("No se encontro usuario")
  }
  await limpiarCampos();
  console.log(usuario);
}
const limpiarCampos = async () => {
  cedula.value = "";
  password.value = "";
  console.log(cedula.value);
  console.log(password.value);
  /*
  console.log(`Usuario acedido: ${email.value} \n ${password.value}`);
  const respuesta = await api.buscarAdministradores(email.value.toString());
  console.log("respuesta");
  console.log(respuesta);
  if (respuesta != null) {
    router.push("/requests");
  }
  */
};
onMounted(() => {
  let router = document.getElementById("router");
  router.classList.toggle("router");
  console.log(router);
});

</script>

<template>
  <div class="login">
    <div class="login-bc">
      <div class="login__form" action="">
        <h2 class="login__form--msg">Ingresar a la aplicación</h2>
        <div class="login__form__mail">
          <input type="text" placeholder="Cédula" v-model="cedula">
        </div>
        <div class="login__form__password">
          <input type="password" placeholder="Contraseña" v-model="password">
        </div>
        <p v-if="errMsg">{{ errMsg }}</p>
<!--
        <button class="login__form__btn" @click="props.iniciarSesion()">
          Google
        </button>
-->
        <div class="login__form__action">
          <button class="login__form__btn cancel" @click="limpiarCampos()">Limpiar</button>
          <button class="login__form__btn succes" @click="extraerDatosLogin()">Iniciar Sesión</button>
        </div>
      </div>
    </div>
  </div>
</template>
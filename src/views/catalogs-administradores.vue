<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

let dataAdministradores = reactive([]);
let dataProfesores = reactive([]);

let cedulaProfesorSeleccionado = ref(null);

let crearAdmin = ref(false);

let administrador = ref({
  apellidos: "",
  cedula_administrador: "",
  contrasena: "",
  id_usuario: "",
  nombres: "",
  confirmContrasena: "",
});

let nuevoAdministrador = ref({
  apellidos: "",
  cedula_administrador: "",
  contrasena: "",
  id_usuario: "",
  nombres: "",
  confirmContrasena: "",
});

nuevoAdministrador.value.cedula_administrador = computed(() => {
  console.log('aaaaaactivooooooooooo');
  console.log(cedulaProfesorSeleccionado.value);
  if (cedulaProfesorSeleccionado.value != null){
    console.log('kjhlhjkhjkhkjh');
    let arregloProfesor = dataProfesores.value.filter(
      (e) => e.cedula == cedulaProfesorSeleccionado.value
    )
    let keys = Object.keys(arregloProfesor[0]);
    keys.forEach( t =>{
      nuevoAdministrador.value[t] = arregloProfesor[0][t];
    });
    console.log(nuevoAdministrador.value);
    return cedulaProfesorSeleccionado.value;
  };
  return '';
});

const clickComponente = (admin) => {
  crearAdmin.value = false;
/*
  let keysNuevo = Object.keys(nuevoAdministrador.value);
  keysNuevo.forEach((e) =>{
    nuevoAdministrador.value[e] = '';
  })
  nuevoAdministrador.value.id_usuario = null;
*/

  let keys = Object.keys(admin);
  keys.forEach((element) => {
    administrador.value[element] = admin[element];
  });
};

const clickCrear = () =>{
  let keys = Object.keys(administrador.value);
  keys.forEach((element) => {
    administrador.value[element] = '';
  });
  crearAdmin.value = true;
};

const compararCedulaEnAdministradores = (cedula) =>{

  let bandera = false;
  dataAdministradores.value.forEach(e =>{
    if (e.cedula_administrador == cedula) {bandera = true;} 
  });

  return bandera;
}

const actualizarAdmin = async ()=>{
  await api.actualizarAdministradores( administrador.value );
  await pedirData();
  alert('Administrador actualizado con exito!');
};
const crearAdministrador = async ()=>{
  console.log(nuevoAdministrador.value);
  await api.crearAdministradores( nuevoAdministrador.value );
  await pedirData();
  alert('Administrador creado con exito!');
};


const pedirData = async () =>{
  dataAdministradores.value = await api.obtenerAdministradores();
  dataProfesores.value = await api.obtenerProfesores();
  dataProfesores.value.sort((x, y) => x.apellidos.localeCompare(y.apellidos));
}

onMounted(async () => {
  await pedirData();
  console.log(dataProfesores.value);
});
</script>
<template>
  <div class="request">
    <h1>Catalogo de Administradores</h1>
    <div class="committe__container__display__controllers">
      <button>
        <img src="../assets/imgs/search-circle-outline.svg" />Buscar Solicitud
      </button>
      <button @click="clickCrear()">
        <img src="../assets/imgs/add-circle-outline.svg" alt="" />Crear
        Estudiante
      </button>
    </div>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__list">
          <!-- Aqui va el registro para las propuestas de trabajo de grado -->
          <div
            class="request__container__display__list__record"
            v-for="e in dataAdministradores.value"
            :key="e.cedula_administrador"
            @click="clickComponente(e)"
          >
            <p>ID: {{ e.cedula_administrador }}</p>
            <p>Apellidos: {{ e.apellidos }}</p>
            <p>Nombres: {{ e.nombres }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <div action="" class="committe__container__preview__form">
          <div id="consultar" class="request__container__preview__form up-de"
            v-if="!crearAdmin"
          >
            <p>Cedula</p>
            <input disabled type="text" v-model="administrador.cedula_administrador" />
            <p>Apellidos</p>
            <input disabled type="text" v-model="administrador.apellidos" />
            <p>Nombres</p>
            <input disabled type="text" v-model="administrador.nombres" />
            <p>Usuario</p>
            <input disabled type="text" v-model="administrador.id_usuario" />
            <p>Constraseña</p>
            <p v-if="administrador.contrasena != '' && administrador.contrasena.length < 8" style="color: red;">La contraseña debe tener minimo 8 Caracteres</p>
            <input
              minlength="8"
              maxlength="14"
              type="text"
              v-model="administrador.contrasena"
            />
            <p>Confirmar Constraseña</p>
            <p v-if="administrador.contrasena != '' && administrador.contrasena != administrador.confirmContrasena" style="color: red;">Las contraseñas no son iguales</p>
            <input
              minlength="8"
              maxlength="14"
              type="text"
              v-model="administrador.confirmContrasena"
            />
            <div class="actions">
              <button
                class="succes"
                :disabled="
                  administrador.cedula_administrador === '' ||
                  administrador.apellidos === '' ||
                  administrador.nombres === '' ||
                  administrador.id_usuario === '' ||
                  administrador.contrasena === '' ||
                  administrador.confirmContrasena === '' ||
                  administrador.contrasena.length < 8 ||
                  administrador.confirmContrasena !== administrador.contrasena
                "
                @click="actualizarAdmin()"
              >
                Actualizar Administrador
              </button>
            </div>
          </div>
          <div id="crear" class="request__container__preview__form up-de"
            v-if="crearAdmin"
          >
            <p>Seleccione el Profesor:</p>
            <select name="profesores" v-model="cedulaProfesorSeleccionado">
              <option :value="null">Seleccione el profesor</option>
              <option 
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
                :style="
                  compararCedulaEnAdministradores(p.cedula)? 'display: none' : 'display: inline'
                "
                >
              {{ p.apellidos }}  {{ p.nombres }}
              </option>
            </select>
            <p>Cedula</p>
            <input disabled type="text" v-model="nuevoAdministrador.cedula" />
            <p>Apellidos</p>
            <input disabled type="text" v-model="nuevoAdministrador.apellidos" />
            <p>Nombres</p>
            <input disabled type="text" v-model="nuevoAdministrador.nombres" />
            <p>Constraseña</p>
            <p v-if="nuevoAdministrador.contrasena != '' && nuevoAdministrador.contrasena.length < 8" style="color: red;">La contraseña debe tener minimo 8 Caracteres</p>
            <input
              minlength="8"
              maxlength="14"
              type="text"
              v-model="nuevoAdministrador.contrasena"
            />
            <p>Confirmar Constraseña</p>
            <p v-if="nuevoAdministrador.contrasena != '' && nuevoAdministrador.contrasena != nuevoAdministrador.confirmContrasena" style="color: red;">Las contraseñas no son iguales</p>
            <input
              minlength="8"
              maxlength="14"
              type="text"
              v-model="nuevoAdministrador.confirmContrasena"
            />
            <div class="actions">
              <button
                class="succes"
                :disabled="
                  nuevoAdministrador.cedula_administrador === '' ||
                  nuevoAdministrador.apellidos === '' ||
                  nuevoAdministrador.nombres === '' ||
                  nuevoAdministrador.contrasena === '' ||
                  nuevoAdministrador.confirmContrasena === '' ||
                  nuevoAdministrador.contrasena.length < 8 ||
                  nuevoAdministrador.confirmContrasena !== nuevoAdministrador.contrasena
                "
                @click="crearAdministrador()"
              >
                Añadir Administrador
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </div>
      </div>
    </div>
  </div>
</template>
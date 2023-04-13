<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { PlantillaDatosPersonales } from "../modules/classes/plantillasDatosPersonales.js";
import { PlanillaCrearSolicitud } from "../modules/classes/planillaCrearSolicitud.js";
import { PlanillaPropuestaTEG } from "../modules/classes/planillaPropuestaTEG.js";
import { PlanillaPropuestaTIG } from "../modules/classes/planillaPropuestaTIG.js";
import { FormularioEmpresa } from "../modules/classes/formularioEmpresa.js";

const props = defineProps({
  showPlanillaCreate: Boolean,
});
const emit = defineEmits(["refrescar"]);

// ---------------------------

let alumno1 = ref(new PlantillaDatosPersonales());
let alumno2 = ref(new PlantillaDatosPersonales());
let showAlumno2 = ref(false);

let crearSolicitudForm = ref(new PlanillaCrearSolicitud());

let crearEmpresa = ref(new FormularioEmpresa());

let dataEmpresas = reactive([]);
let idEmpresaSeleccionada = ref(null);

const limpiarTodo = async () => {
  let clavesAlumno1 = Object.keys(alumno1.value);
  clavesAlumno1.forEach(element => {
    alumno1.value[element] = '';
  });

  let clavesAlumno2 = Object.keys(alumno2.value);
  clavesAlumno2.forEach(element => {
    alumno1.value[element] = '';
  });
  showAlumno2.value = false;

  crearSolicitudForm.value.alumnos = [];
  crearSolicitudForm.value.cedulaTutor = '';

  // let clavesEmpresa = Object.keys(crearSolicitudForm.value.empresa);

  // clavesEmpresa.forEach(element =>{
  //   crearSolicitudForm.value.empresa[element] = '';
  // });

  let clavesTg = Object.keys(crearSolicitudForm.value.trabajoDeGrado);

  clavesTg.forEach(element =>{
    crearSolicitudForm.value.trabajoDeGrado[element] = '';
  });

  let clavesExterno = Object.keys(crearSolicitudForm.value.tutorEmpresarial);

  clavesExterno.forEach(element =>{
    crearSolicitudForm.value.tutorEmpresarial[element] = '';
  });

  crearSolicitudForm.value.volverAEmpresa()
  crearSolicitudForm.value.volverATutor();
  crearSolicitudForm.value.volverATituloAlumno();

};

const mostarAlumno2 = () => {
  showAlumno2.value = !showAlumno2.value;

  if (!showAlumno2.value && crearSolicitudForm.value.alumnos.length > 1) {
    crearSolicitudForm.value.quitarAlumno();
    alumno2.value.apellidos = "";
    alumno2.value.nombres = "";
    alumno2.value.cedula = "";

    alumno2.value.email = "";
    alumno2.value.telefono = "";
    alumno2.value.oficina = "";
    alumno2.value.habitacion = "";
  }
};

const añadirEmpresa = async () => {
  await api.crearEmpresa(crearEmpresa.value);
  console.log(crearEmpresa.value);
  crearSolicitudForm.value.ocultarAddEmpresa();
  dataEmpresas.value = await api.obtenerEmpresas();
  crearEmpresa.value.direccion = "";
  crearEmpresa.value.nombre = "";
  crearEmpresa.value.telefono = "";
};

async function buscarEstudiantes() {
  let alumnos = [];

  const resEstudiante = await api.obtenerEstudianteByCedula(
    alumno1.value.cedula
  );
  alumno1.value.apellidos = resEstudiante.apellidos;
  alumno1.value.nombres = resEstudiante.nombres;
  alumno1.value.cedula = resEstudiante.cedula;

  alumno1.value.email = resEstudiante.email;
  alumno1.value.telefono = resEstudiante.telefono;
  alumno1.value.oficina = resEstudiante.oficina;
  alumno1.value.habitacion = resEstudiante.habitacion;

  console.log(alumno1.value);
  alumnos.push(alumno1.value);

  if (alumno2.value.cedula != "") {
    const resEstudiante2 = await api.obtenerEstudianteByCedula(
      alumno2.value.cedula
    );
    alumno2.value.apellidos = resEstudiante2.apellidos;
    alumno2.value.nombres = resEstudiante2.nombres;
    alumno2.value.cedula = resEstudiante2.cedula;

    alumno2.value.email = resEstudiante2.email;
    alumno2.value.telefono = resEstudiante2.telefono;
    alumno2.value.oficina = resEstudiante2.oficina;
    alumno2.value.habitacion = resEstudiante2.habitacion;

    alumnos.push(alumno2.value);
  }
  crearSolicitudForm.value.alumnos = alumnos;
  console.log(crearSolicitudForm.value.alumnos);
}

async function buscarTutor() {
  console.log("BuscarTutor()");
  console.log(crearSolicitudForm.value.tutor.cedula);
  const resTutor = await api.obtenerProfesorByCedula(
    crearSolicitudForm.value.tutor.cedula
  );
  crearSolicitudForm.value.tutor.apellidos = resTutor.apellidos;
  crearSolicitudForm.value.tutor.nombres = resTutor.nombres;
  crearSolicitudForm.value.tutor.cedula = resTutor.cedula;

  crearSolicitudForm.value.tutor.email = resTutor.email;
  crearSolicitudForm.value.tutor.telefono = resTutor.telefono;
  crearSolicitudForm.value.tutor.oficina = resTutor.oficina;
  crearSolicitudForm.value.tutor.experiencia = resTutor.experiencia;
  crearSolicitudForm.value.tutor.habitacion = resTutor.habitacion;
  crearSolicitudForm.value.tutor.fecha_graduado = resTutor.fecha_graduado;
  crearSolicitudForm.value.tutor.cargo = resTutor.cargo;
  crearSolicitudForm.value.tutor.profesion = resTutor.profesion;
}

async function buscarTutorEmpresarial() {
  const resTutorEmpresarial = await api.obtenerExternoByCedula(
    crearSolicitudForm.value.tutorEmpresarial.cedula
  );
  crearSolicitudForm.value.tutorEmpresarial.nombres =
    resTutorEmpresarial.nombres;
  crearSolicitudForm.value.tutorEmpresarial.apellidos =
    resTutorEmpresarial.apellidos;
  crearSolicitudForm.value.cedula = resTutorEmpresarial.cedula;
}

crearSolicitudForm.value.empresa.id_empresa = computed(() => {
  if (idEmpresaSeleccionada.value != null) {
    let arregloEmpresa = dataEmpresas.value.filter(
      (t) => t.id_empresa == idEmpresaSeleccionada.value
    );

    crearSolicitudForm.value.empresa.nombre = arregloEmpresa[0].nombre;
    crearSolicitudForm.value.empresa.rif = arregloEmpresa[0].rif;
    crearSolicitudForm.value.empresa.direccion = arregloEmpresa[0].direccion;
    crearSolicitudForm.value.empresa.telefono = arregloEmpresa[0].telefono;
    //crearSolicitudForm.value.empresa.id_empresa = arregloEmpresa[0].id_empresa;
    console.log(arregloEmpresa[0]);
    return arregloEmpresa[0].id_empresa;
  }
  return "";
});

async function insertarPlanilla() {
  let planillaGenerada;
 
  if (crearSolicitudForm.value.trabajoDeGrado.modalidad == "E") {

    console.log(crearSolicitudForm.value.alumnos)
    await api.crearTrabajoGradoExperimental(
      crearSolicitudForm.value.trabajoDeGrado,
      crearSolicitudForm.value.alumnos,
      crearSolicitudForm.value.tutor.cedula,
      crearSolicitudForm.value.empresa.id_empresa
    );
    planillaGenerada = new PlanillaPropuestaTEG(
      crearSolicitudForm.value.trabajoDeGrado.titulo,
      crearSolicitudForm.value.empresa.nombre,
      crearSolicitudForm.value.empresa,
      {
        nombres: `${crearSolicitudForm.value.tutor.nombres}`,
        apellidos: `${crearSolicitudForm.value.tutor.apellidos}`,
        cedula: crearSolicitudForm.value.tutor.cedula,
        email: crearSolicitudForm.value.tutor.email,
        oficina: crearSolicitudForm.value.tutor.oficina,
        telefono: crearSolicitudForm.value.tutor.telefono,
        profesion: crearSolicitudForm.value.tutor.profesion,
        experiencia: crearSolicitudForm.value.tutor.experiencia,
        fecha_graduado: crearSolicitudForm.value.tutor.fecha_graduado,
        cargo: crearSolicitudForm.value.tutor.cargo,
        fecha_entrega: new Date(),
      }
    );
  } else {
    const cedulatutorempresarial = await api.obtenerExternoByCedula(
      crearSolicitudForm.value.tutorEmpresarial.cedula
    );
    console.log("cedulatutorempresarial");
    console.log(cedulatutorempresarial);
    await api.crearTrabajoGradoInstrumental(
      crearSolicitudForm.value.trabajoDeGrado,
      crearSolicitudForm.value.alumnos,
      cedulatutorempresarial.id_externo,
      crearSolicitudForm.value.empresa.id_empresa
    );
    planillaGenerada = new PlanillaPropuestaTIG(
      crearSolicitudForm.value.trabajoDeGrado.titulo,
      crearSolicitudForm.value.empresa.nombre,
      crearSolicitudForm.value.empresa,
      {
        nombres: `${crearSolicitudForm.value.tutorEmpresarial.nombres}`,
        apellidos: `${crearSolicitudForm.value.tutorEmpresarial.apellidos}`,
        cedula: crearSolicitudForm.value.tutorEmpresarial.cedula,
        email: crearSolicitudForm.value.tutorEmpresarial.email,
        telefono: crearSolicitudForm.value.tutorEmpresarial.telefono,
        profesion: crearSolicitudForm.value.tutorEmpresarial.profesion,
        fecha_entrega: new Date(),
      }
    );
  }
  planillaGenerada.añadirAlumno({
    nombres: `${crearSolicitudForm.value.alumnos[0].nombres}`,
    apellidos: `${crearSolicitudForm.value.alumnos[0].apellidos}`,
    cedula: crearSolicitudForm.value.alumnos[0].cedula,
    telefono: crearSolicitudForm.value.alumnos[0].telefono,
    email: crearSolicitudForm.value.alumnos[0].email,
    oficina: crearSolicitudForm.value.alumnos[0].oficina,
    habitacion: crearSolicitudForm.value.alumnos[0].habitacion,
    fecha_inicio: "#####",
    horario_propuesto: "#####",
  });
  if (alumno2.value.cedula != "") {
    planillaGenerada.añadirAlumno({
      nombres: `${crearSolicitudForm.value.alumnos[1].nombres}`,
      apellidos: `${crearSolicitudForm.value.alumnos[1].apellidos}`,
      cedula: crearSolicitudForm.value.alumnos[1].cedula,
      telefono: crearSolicitudForm.value.alumnos[1].telefono,
      email: crearSolicitudForm.value.alumnos[1].email,
      oficina: crearSolicitudForm.value.alumnos[1].oficina,
      habitacion: crearSolicitudForm.value.alumnos[1].habitacion,
      fecha_inicio: "#####",
      horario_propuesto: "#####",
    });
  }

  emit("refrescar");
  planillaGenerada.imprimir();
  //await limpiarTodo();
  //crearSolicitudForm.value.progressbarState += crearSolicitudForm.value.progressValue;
}

onMounted(async () => {
  dataEmpresas.value = await api.obtenerEmpresas();
  crearSolicitudForm.value.crearSolicitud();
});
//------------------------------------------------------>
</script>
<template>
  <div class="create-state" v-show="showPlanillaCreate">
    <div class="progressbar">
      <div
        class="progressbar--content"
        :style="{ width: crearSolicitudForm.progressbarState + '%' }"
      ></div>
    </div>
    <div class="create-carousel">
      <div class="students" v-show="crearSolicitudForm.showTituloAlumno">
        <form
          class="request__container__preview__form"
          @submit.prevent="submit"
        >
          <div class="request__container__preview__form__inputs">
            <!-- Trabajo de grado -->
            <p @click="mostrarTextArea()" for="">Titulo del Trabajo</p>
            <textarea
              maxlength="200"
              v-model="crearSolicitudForm.trabajoDeGrado.titulo"
              class="request__container__preview__form__inputs--titulo-tg"
              placeholder="Tutilo de Propuesta TG"
            ></textarea>
            <p for="">Modalidad</p>
            <select
              name="modalidad"
              id=""
              v-model="crearSolicitudForm.trabajoDeGrado.modalidad"
            >
              <option value="E">Experimental</option>
              <option value="I">Instrumental</option>
            </select>
            <!-- Estudiante 1 -->
            <div id="estudiante1">
              <p for="">Cedula Alumno</p>
              <input
                type="number"
                placeholder="V27301846"
                v-model="alumno1.cedula"
              />
              <!--<p for="">Nombres</p>-->
              <input
                disabled
                type="text"
                placeholder="Nombres"
                v-model="alumno1.nombres"
              />
              <!--<p for="">Apellidos</p>-->
              <input
                disabled
                type="text"
                placeholder="Apellidos"
                v-model="alumno1.apellidos"
              />
              <button
                style="display: none"
                type="submit "
                @click="buscarEstudiantes()"
              ></button>
            </div>
            <div v-show="showAlumno2" id="estudiante2">
              <p for="">Cedula Alumno</p>
              <input
                type="number"
                placeholder="V27301846"
                v-model="alumno2.cedula"
              />
              <!--<p for="">Nombres</p>-->
              <input
                disabled
                type="text"
                placeholder="Nombres"
                v-model="alumno2.nombres"
              />
              <!--<p for="">Apellidos</p>-->
              <input
                disabled
                type="text"
                placeholder="Apellidos"
                v-model="alumno2.apellidos"
              />
            </div>
          </div>
          <button class="succes" @click="mostarAlumno2()">
            {{ showAlumno2 ? "Quitar Estudiante" : "Añadir Estudiante" }}
          </button>
          <div class="actions">
            <button
              :disabled="
                crearSolicitudForm.trabajoDeGrado.modalidad == '' ||
                crearSolicitudForm.trabajoDeGrado.titulo == '' ||
                alumno1.apellidos == '' ||
                (showAlumno2 && alumno2.apellidos == '')
              "
              @click="crearSolicitudForm.tituloAlumnoCompletado()"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
      <div
        class="tutor"
        v-show="
          crearSolicitudForm.showTutor &&
          crearSolicitudForm.trabajoDeGrado.modalidad == 'E'
        "
      >
        <form
          class="request__container__preview__form"
          @submit.prevent="submit"
        >
          <img
            src="../assets/imgs/arrow-back-circle-outline.svg"
            alt=""
            @click="crearSolicitudForm.volverATituloAlumno"
          />
          <!-- Tutor Academico -->
          <div class="request__container__preview__form__inputs">
            <p for="">Cédula del Posible Tutor Académico</p>
            <input
              type="number"
              placeholder="V27301846"
              v-model="crearSolicitudForm.tutor.cedula"
            />
            <!--<p for="">Nombres</p>-->
            <input
              disabled
              type="text"
              placeholder="Nombres"
              v-model="crearSolicitudForm.tutor.nombres"
            />
            <!--<p for="">Apellidos</p>-->
            <input
              disabled
              type="text"
              placeholder="Apellidos"
              v-model="crearSolicitudForm.tutor.apellidos"
            />
            <!--<p for="">Años de Experienci a</p>-->
            <input disabled type="number" placeholder="4 años" />
          </div>
          <div class="actions">
            <button
              style="display: none"
              type="submit "
              @click="buscarTutor()"
            ></button>
            <button
              @click="crearSolicitudForm.tutorCompletado()"
              :disabled="crearSolicitudForm.tutor.apellidos == ''"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
      <div
        class="external-profesional"
        v-show="
          crearSolicitudForm.showTutor &&
          crearSolicitudForm.trabajoDeGrado.modalidad == 'I'
        "
      >
        <form
          class="request__container__preview__form"
          @submit.prevent="submit"
        >
          <img
            src="../assets/imgs/arrow-back-circle-outline.svg"
            alt=""
            @click="crearSolicitudForm.volverATituloAlumno"
          />
          <!-- Tutor Empresarial -->
          <div class="request__container__preview__form__inputs">
            <p>Id de Tutor Empresarial</p>
            <input
              type="number"
              placeholder="59885-VNL"
              v-model="crearSolicitudForm.tutorEmpresarial.cedula"
            />
            <!--<p for="">Nombres</p>-->
            <input
              disabled
              type="text"
              placeholder="Nombres"
              v-model="crearSolicitudForm.tutorEmpresarial.nombres"
            />
            <!--<p for="">Apellidos</p>-->
            <input
              disabled
              type="text"
              placeholder="Apellidos"
              v-model="crearSolicitudForm.tutorEmpresarial.apellidos"
            />
            <!--<p for="">Años de Experienci a</p>-->
            <input disabled type="number" placeholder="4 años" />
          </div>
          <div class="actions">
            <button
              style="display: none"
              type="submit "
              @click="buscarTutorEmpresarial()"
            ></button>
            <button
              @click="crearSolicitudForm.tutorCompletado()"
              :disabled="crearSolicitudForm.tutorEmpresarial.apellidos == ''"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
      <div class="company" v-show="crearSolicitudForm.showEmpresa">
        <form
          class="request__container__preview__form"
          @submit.prevent="submit"
        >
          <img
            src="../assets/imgs/arrow-back-circle-outline.svg"
            alt=""
            @click="crearSolicitudForm.volverATutor()"
          />
          <div class="request__container__preview__form__inputs">
            <!-- Empresa-->
            <p>Seleccione la empresa:</p>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <select name="Empresa" id="" v-model="idEmpresaSeleccionada">
                <option
                  v-for="t in dataEmpresas.value"
                  :key="t.id_empresa"
                  :value="t.id_empresa"
                >
                  {{ t.nombre }}
                </option>
              </select>
              <button @click="crearSolicitudForm.mostrarAddEmpresa()">+</button>
            </div>
            <input
              type="text"
              disabled
              v-model="crearSolicitudForm.empresa.rif"
              placeholder="rif"
            />
            <input
              type="text"
              disabled
              v-model="crearSolicitudForm.empresa.direccion"
              placeholder="direccion"
            />
            <input
              type="text"
              disabled
              v-model="crearSolicitudForm.empresa.telefono"
              placeholder="telefono"
            />
          </div>
          <div class="actions">
            <button
              class="succes"
              :disabled="crearSolicitudForm.empresa.id_empresa == ''"
              @click="insertarPlanilla()"
            >
              Completado!
            </button>
          </div>
        </form>
      </div>
      <div class="company plus" v-show="crearSolicitudForm.showAddEmpresa">
        <div action="" class="request__container__preview__form">
          <img
            src="../assets/imgs/arrow-back-circle-outline.svg"
            alt=""
            @click="crearSolicitudForm.ocultarAddEmpresa"
          />
          <div class="request__container__preview__form__inputs">
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
              type="number"
              placeholder="Telefono"
              v-model="crearEmpresa.telefono"
            />
          </div>
          <button
            class="login__form__btn succes"
            :disabled="
              crearEmpresa.nombre == '' ||
              crearEmpresa.direccion == '' ||
              crearEmpresa.telefono == ''
            "
            @click="añadirEmpresa()"
          >
            Añadir Empresa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
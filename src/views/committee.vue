<script setup>
import Record from "../components/record.vue";
import { ref, reactive, onMounted } from "vue";
import * as api from "../modules/apiTools.js";
import { PropuestaTg } from "../modules/classes/planillaPropuesta.js";

let dataPropuestas = reactive([]);
let dataComites = reactive([]);
//Lista de comites en bdd
let comites;

let formularioPropuesta = ref(new PropuestaTg());

const clickenComponente = async (id) => {
  //console.log(id);
  formularioPropuesta.value = await api.obtenerTGById(id);
  //console.log("formularioPropuesta.value");
  //console.log(formularioPropuesta.value);
  console.log(formularioPropuesta.value.id_ctg);

  let datosProfesor;

  if (formularioPropuesta.value.modalidad === "E") {
    const resdatosProfesor = await api.obtenerProfesorByCedula(
      formularioPropuesta.value.id_tutor_academico
    );
    datosProfesor = resdatosProfesor;
  } else {
    const resdatosProfesor = await api.obtenerProfesorByCedula(
      formularioPropuesta.value.id_tutor_empresarial
    );
    datosProfesor = resdatosProfesor;
  }
};

const rechazarPropuestaComite = async () => {
  await api.rechazarPropuestaCTG(formularioPropuesta.value.id_tg, formularioPropuesta.value.id_ctg,"R");
  dataPropuestas.value = await api.obtenerPropuestas("PC");
  formularioPropuesta.value = new PropuestaTg();
};

const aprobarPropuestaComite = async () => {
  //await api.aprobarPropuestaComite(formularioPropuesta.value.id_tg);
  await api.aprobarPropuestaCTG(formularioPropuesta.value.id_tg, formularioPropuesta.value.id_ctg,"A",formularioPropuesta.value.observaciones_comite);
  dataPropuestas.value = await api.obtenerPropuestas("PC");
  formularioPropuesta.value = new PropuestaTg();
};

onMounted(async () => {
  dataPropuestas.value = await api.obtenerPropuestas("PC");
  comites = await api.obtenerComites();
  dataComites.value = await api.obtenerCTG();
  console.log(comites);
  console.log(dataComites.value);
});
</script>
<template>
  <div class="request">
    <h1>Comite de escuela</h1>
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
          <Record
            class="request__container__display__list__record"
            v-for="t in dataPropuestas.value"
            :key="t.id_tg"
            :id_tg="t.id_tg_formateado"
            :titulo="t.titulo"
            :fecha_solicitud="t.fecha_solicitud"
            :modalidad="t.modalidad"
            :estatus="t.estatus"
            @click="clickenComponente(t.id_tg)"
          />
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <!-- Aquí puedes escribir tu comentario -->
       <!-- <form action="" class="committe__container__preview__form">-->
        
          <h2>Visualización del documento de solicitud</h2>
          <div class="request__container__preview__form up-de">
            <div class="request__container__preview__form__inputs">
              <p>Titulo del Trabajo</p>
              <textarea
                disabled
                type="text"
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Tutilo de Propuesta TG"
                v-model="formularioPropuesta.titulo"
              ></textarea>
              <p>Modalidad</p>
              <input
                disabled
                type="text"
                v-model="formularioPropuesta.modalidad"
              />
              <p>Fecha de solicitud</p>
              <input
                disabled
                type="date"
                v-model="formularioPropuesta.fecha_solicitud"
              />
              <p>Estatus</p>
              <input
                disabled
                type="text"
                v-model="formularioPropuesta.estatus"
              />
              <p>Cómite encargado de la revisión: </p>
              <select v-model="formularioPropuesta.id_ctg" name="consejo" id="">
                <option 
                  v-for="c in dataComites.value"
                  :key="c.id_ctg"
                  :value="c.id_ctg"
                >{{ c.id_ctg_formateado }}</option>
              </select>
              <textarea
                v-model="formularioPropuesta.observaciones_comite"
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Observaciones..."
                :disabled="formularioPropuesta.titulo == ''"
              ></textarea>
            </div>
            <div class="actions">
              <button
                class="succes"
                @click="aprobarPropuestaComite()"
                :disabled=" formularioPropuesta.id_ctg == '' || formularioPropuesta.id_ctg == undefined "
              >
                Aceptar
              </button>
              <button 
                class="cancel" 
                @click="rechazarPropuestaComite()"
                :disabled="formularioPropuesta.id_ctg == undefined || formularioPropuesta.observaciones_comite == '' || formularioPropuesta.observaciones_comite == undefined "
              >
                Rechazar
              </button>
            </div>
            
            <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
          
        <!--</form>-->
          </div>
      </div>
    </div>
  </div>
</template>
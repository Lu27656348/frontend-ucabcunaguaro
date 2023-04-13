import { generarCartaDesignacionRevisor } from '../generadorDOCX/carta_designacion_revisor';
import { generarPE_revisor_teg } from '../generadorDOCX/pe_revisor_teg.js';
import { generarPE_revisor_tig } from '../generadorDOCX/pe_revisor_tig.js';
import { _ } from 'lodash';
export class PlanillaDesignacionRevisor {
  constructor(
    titulo,
    tutor,
    fecha_designacion,
    administrador,
    modalidad,
    revisor,
    organizacion
  ) {
    this.propuesta = {
      titulo: titulo,
      alumno: [],
      tutor_academico: tutor
    };
    this.organizacion = organizacion
    this.fecha_designacion = fecha_designacion;
    this.administrador = administrador.nombre;
    this.correo_administrador = administrador.correo_administrador
    this.modalidad = modalidad;
    this.revisor = revisor;
  };
  añadirAlumno( alumno ){
    if (this.propuesta.alumno.length < 2)
    this.propuesta.alumno.push( alumno );
  else
    alert('No se pueden añadir mas de 2 alumnos por Trabajo de Grado');
  }
  imprimir() {
    generarCartaDesignacionRevisor(this)
    if(this.modalidad == 'E'){
      console.log("Generar planillas de revisor experimental");
      generarPE_revisor_teg(this);
    }else{
      console.log("Generar planillas de revisor instrumental");
      generarPE_revisor_tig(this)
    }
  };
}

import { generarCartaDesignacionTutorTEG } from '../generadorDOCX/carta_designacion_tutor_teg.js';
import { generarCartaDesignacionTutorTIG } from '../generadorDOCX/carta_designacion_tutor_tig.js';
import { _ } from 'lodash';
export class FormularioCartaDesigancion{
  constructor(
    titulo,
    modalidad,
    alumno,
    tutor_academico,
    tutor_empresarial,
    id_cde,
    administrador,
    empresa
  ){
    this.propuesta = {
      titulo: titulo,
      modalidad: modalidad,
      alumno: alumno,
      tutor_academico: tutor_academico,
      tutor_empresarial: tutor_empresarial
    };
    this.fecha_designacion = new Date();
    this.CDE = id_cde;
    this.administrador = administrador;
    this.empresa = empresa;
  };
  imprimirPlanilla(id){
    this.propuesta.modalidad == 'E'?
    generarCartaDesignacionTutorTEG(this,id)
    :
    generarCartaDesignacionTutorTIG(this,id);
  }
};
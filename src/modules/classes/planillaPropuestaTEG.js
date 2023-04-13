import { generarPlanillaPropuestaTEG } from '../generadorDOCX/planilla_propuesta_TEG'
import { _ } from 'lodash'
export class PlanillaPropuestaTEG{

  constructor(
    titulo,
    organizacion,
    empresa,
    tutor_academico
  ){
    this.fecha_envio = new Date();
    this.titulo = titulo;
    this.organizacion = organizacion;
    this.alumnos = [];
    this.empresa = empresa;
    this.tutor_academico = tutor_academico;
  };
  añadirAlumno ( alumno ){
    if (this.alumnos.length < 2)
      this.alumnos.push( alumno );
    else
      alert('No se pueden añadir mas de 2 alumnos por Trabajo de Grado');
  };
  imprimir(){
    generarPlanillaPropuestaTEG( this );
  }
}
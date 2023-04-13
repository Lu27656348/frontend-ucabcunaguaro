import { generarPE_revisor_teg } from './generadorDOCX/pe_revisor_teg';
import { generarCartaDesignacionTutorTIG } from './generadorDOCX/pe_revisor_tig';
import { _ } from 'lodash';

export class PlanillaRevisorTeg {
  constructor(
    propuesta,
    tutor_academico,
    revisor,
    alumnos,
  ) {
    this.propuesta = {
      titulo: propuesta.titulo,
      organizacion: propuesta.oranizacion,
      modalidad: propuesta.modalidad
    };
    this.tutor_academico = {
      nombres: tutor_academico.nombres,
      apellidos: tutor_academico.apellidos,
      cedula: tutor_academico.cedula,
      profesion: tutor_academico.profesion,
      experiencia: tutor_academico.experiencia,
      cargo: tutor_academico.cargo,
      correo: tutor_academico.correo,
      telefono: tutor_academico.telefono
    };
    this.revisor = {
      nombres: revisor.nombres,
      apellidos: revisor.apellidos,
      desicion_final: revisor.desicion_final,
      fecha_revisado: new Date(),
      observaciones: revisor.observaciones
    };
    this.alumnos = alumnos;
  };
  añadirAlumno( alumno ){
    if (this.propuesta.alumno.length < 2)
    this.propuesta.alumno.push( alumno );
  else
    alert('No se pueden añadir mas de 2 alumnos por Trabajo de Grado');
  };
  imprimir(){
    this.propuesta.modalidad == 'E'?
    generarPE_revisor_teg( this )
    :
    generarCartaDesignacionTutorTIG( this )
  };
}
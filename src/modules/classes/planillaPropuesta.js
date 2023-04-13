export class PropuestaTg{
  constructor(){
    this.id_tg = '';
    this.titulo = '';
    this.modalidad = '';
    this.alumnos = [];
    this.id_tutor_academico=null;
    this.id_tutor_empresarial = null;
    this.estatus = '';
    this.id_ctg = '';
    this.id_cde = '';
    this.observaciones_revisor = '';
    this.observaciones_comite = '';
    this.observaciones_consejo = '';
    this.id_profesor_revisor = '';
  };
  setPropuestaPendienteRevisor(){
    this.status = 'PR';
    return;
  };
  setPropuestaPendienteEscuela(){
    this.status = 'PE';
    return;
  };
  setPropuestaAprobada(){
    this.status = 'A';
    return;
  };
  setPropuestaRechazada(){
    this.estatus = 'R';
    return;
  }
  setRevidor(idRevisor){
    this.revisor = idRevisor;
    return;
  };
  setTutorAcademico(idTutorAcademico){
    this.tutor_academico = idTutorAcademico;
    return;
  };
};
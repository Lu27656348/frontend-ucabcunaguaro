import { dateTimeValue } from 'docx';
import { PlantillaDatosPersonales } from './plantillasDatosPersonales.js';
export class PlanillaCrearSolicitud {

  constructor() {
    this.showTituloAlumno = false;
    this.showTutor = false;
    this.showEmpresa = false;
    this.showAddEmpresa = false;
    
    this.progressValue = 33.3;
    this.progressbarState = 0;

    this.trabajoDeGrado = {
      titulo: "",
      modalidad: "",
      id_tg: ""
    };
    
    this.alumnos = [];
    this.tutor = new PlantillaDatosPersonales();
    this.tutorEmpresarial = new PlantillaDatosPersonales();
    this.empresa = {
      id_empresa: '',
      nombre: '',
      rif: '',
      direccion: '',
      telefono: ''
    };
  };
  añadirAlumno(alumno){
    this.alumnos.push(alumno);
    alert('Alumno Insertado');
  }
  quitarAlumno(){
    this.alumnos.pop();
    alert('Alumno Descartado');
  }
  crearSolicitud() {
    this.progressbarState = 0;

    this.trabajoDeGrado.titulo = "";
    this.trabajoDeGrado.modalidad = "";
    this.cedulaAlumno = "";
    this.cedulaTutor = "";
    this.empresa.nombre = "";

    this.showTituloAlumno = true;
    this.showTutor = false;
    this.showEmpresa = false;
    this.showTutorEmpresarial = false;
  };
  tituloAlumnoCompletado() {
    this.showTituloAlumno = false;
    this.showTutor = true;
    this.progressbarState += this.progressValue;
  };
  volverATituloAlumno() {
    this.showTituloAlumno = true;
    this.showTutor = false;
    this.progressbarState -= this.progressValue;
  };
  tutorCompletado() {
    this.showTutor = false;
    this.showEmpresa = true;
    this.progressbarState += this.progressValue;
  };
  volverATutor() {
    this.showTutor = true;
    this.showEmpresa = false;
    this.progressbarState -= this.progressValue
  };
  empresaCompletada(){
    this.showEmpresa = false;
    this.showTutorEmpresarial = true;
    this.progressbarState += this.progressValue;
  };
  volverAEmpresa(){
    this.showEmpresa = true;
    this.showTutorEmpresarial = false;
    this.progressbarState -= this.progressValue;
  };
  mostrarAddEmpresa(){
    this.showEmpresa = false;
    this.showAddEmpresa = true;
  };
  ocultarAddEmpresa(){
    this.showAddEmpresa = false;
    this.showEmpresa = true;
  };
}
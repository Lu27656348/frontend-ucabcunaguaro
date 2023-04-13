import { generarCartaDesignacionTutorTEG } from './carta_designacion_tutor_teg.js'
import { generarCartaDesignacionTutorTIG } from './carta_designacion_tutor_tig.js'
import { generarCartaDesignacionRevisor } from './carta_designacion_revisor.js';
//import { generarPlanillaPropuestaTEG } from './planilla_propuesta_TEG.js';
import { generarPlanillaPropuestaTIG } from './planilla_propuesta_TIG.js'

//Modelo de los datos de la carta de designación para inserción de datos
const Carta_designacion_teg= {
    propuesta: {
        titulo: 'Titulo de tesis de grado 2',
        modalidad: 'E',
        alumnno: [{
            cedula: '27656348',
            nombres: 'Luis Carlos',
            apellidos: 'Somoza Ledezma'
        }],
        tutor: 'Bello Chirinos, Jannelly Josefina'
    },
    fecha_designacion: '29 de Julio del 2023',
    CDE: '005-2022-2023',
    administrador: 'Luz. E Medina'
}
const Carta_designacion_tig = {
    propuesta: {
        titulo: 'Titulo de tesis de grado 2',
        modalidad: 'E',
        alumnno: [{
            cedula: '27656348',
            nombres: 'Luis Carlos',
            apellidos: 'Somoza Ledezma'
        },
        {
            cedula: '27656348',
            nombres: 'Luis Carlos',
            apellidos: 'Somoza Ledezma'
        }],
        tutor: 'Bello Chirinos, Jannelly Josefina',
        tutor_empresarial: {
            nombres: "Luis Noel",
            apellidos: "Somoza Yepez",
            cedula: "11997576"
        }
    },
    fecha_designacion: '29 de Julio del 2023',
    CDE: '005-2022-2023',
    administrador: 'Luz. E Medina',
    empresa: "SomozaCorp"
}
const Carta_designacion_revisor = {
    propuesta: {
        titulo: 'Titulo de propuesta de grado',
        modalidad: 'TEG',
        alumno: [{
            cedula: '27656348',
            nombres: 'Luis Carlos',
            apellidos: 'Somoza Ledezma'
        }],
        tutor: 'Bellos Chirinos, Jannelly Josefina'
    },
    fecha_designacion: '29 de Julio del 2020',
    CDE: '005-2022-2023',
    administrador: 'Luz E. Medina',
    correo_administrador: 'lcmedina.19@ucab.edu.ve',
    modalidad: 'TEG',
    revisor: 'Larez, Jesus'
}
const planilla_propuesta_TEG = {
    fecha_envio : "Julio 29 del 2023",
    titulo : "Desarrollo de sistema para generacion de planillas",
    organizacion : "UCAB Guayana",
    alumno : [{
        nombre: "Luis C. Somoza",
        cedula: "27656348",
        telefono: "4249749230",
        email: "lcsomoza.19@est.ucab.edu.ve",
        oficina: '',
        habitacion: '',
        fecha_inicio: '',
        horario_propuesto: ''
    },
    {}
    /*
    {
        nombre: "Luis C. Somoza 2",
        cedula: "27656348",
        telefono: "4249749230",
        email: "lcsomoza.19@est.ucab.edu.ve",
        oficina: '',
        habitacion: '',
        fecha_inicio: '',
        horario_propuesto: ''
    }
    */
    ],
    empresa : {
        nombre: "TIMACA LLC",
        direccion: "No tiene direccion",
        telefono: "4249749230"
    },
    tutor_academico : {
        nombre: "Pedro Perez",
        cedula: "12345678",
        email: "pperez.19@gmail.com",
        telefono: "4249749230",
        profesion: "Ingeniero Civil",
        oficina: 'Datos oficina',
        habitacion: 'Datos habitacion',
        graduado: "5",
        tutor_tg: false,
        profesor_ucab: false,
        experiencia: "8",
        cargo: "Gerente de operaciones",
        fecha_entrega: new Date()
    },
}
const planilla_propuesta_TIG = {
    fecha_envio : "Julio 29 del 2023",
    titulo : "Desarrollo de sistema para generacion de planillas",
    alumno : [{
        nombre: "Luis C. Somoza",
        cedula: "27656348",
        telefono: "4249749230",
        email: "lcsomoza.19@est.ucab.edu.ve",
        oficina: '',
        habitacion: '',
        fecha_inicio: '',
        horario_propuesto: ''
    },
    {
        nombre: "Luis C. Somoza 2",
        cedula: "27656348",
        telefono: "4249749230",
        email: "lcsomoza.19@est.ucab.edu.ve",
        oficina: '',
        habitacion: '',
        fecha_inicio: '',
        horario_propuesto: ''
    }
    ],
    empresa : {
        nombre: "TIMACA LLC",
        direccion: "No tiene direccion",
        telefono: "4249749230"
    },
    tutor_empresarial : {
        nombre: "Pedro Perez",
        cedula: "12345678",
        email: "pperez.19@gmail.com",
        telefono: "4249749230",
        profesion: "Ingeniero Civil",
        oficina: '',
        habitacion: '',
        graduado: 5,
        tutor_tg: false,
        profesor_ucab: false,
        experiencia: 8,
        cargo: "Gerente de operaciones",
        fecha_entrega: new Date()
    }


}
//generarCartaDesignacionTutorTEG(Carta_designacion_teg);
//generarCartaDesignacionTutorTIG(Carta_designacion_tig);
//generarCartaDesignacionRevisor(Carta_designacion_revisor);
//generarPlanillaPropuestaTEG(planilla_propuesta_TEG);
console.log('HALOOO');
//generarPlanillaPropuestaTIG(planilla_propuesta_TIG);







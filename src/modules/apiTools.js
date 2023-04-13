import * as docx from 'docx';
import file_saver from 'file-saver';

import * as estudiantes from './api/estudiantes.js';
import * as profesores from './api/profesores.js';
import * as externos from './api/externos.js';
import * as empresas from './api/empresas.js';
import * as tgs from './api/tg.js';
import * as comites from './api/comite.js';
import * as revisores from './api/revisor.js';
import * as cde from './api/cde.js';
import { async } from '@firebase/util';

import { domain_url_env } from '../../src/config.js';
console.log(domain_url_env)
//const bcrypt = require("bcrypt")

const ronda = 10;

export const insertarEstudiantes = async (estudiante) =>{
  return estudiantes.insertarEstudiantes(estudiante);
};

export const obtenerEstudiantes = async () => {
  return estudiantes.obtenerEstudiantes();
};

export const obtenerEstudianteByCedula = async (cedulaEstudiante) =>{
  return estudiantes.obtenerEstudianteByCedula(cedulaEstudiante);
};

export const obtenerProfesores = async () => {
  return profesores.obtenerProfesores();
};

export const obtenerProfesorByCedula = async (cedulaProfesor) => {
  return profesores.obtenerProfesorByCedula(cedulaProfesor);
};

export const obtenerExternos = async () => {
  return externos.obtenerExternos();
};

export const obtenerExternosById = async ( idExterno) => {
  return externos.obtenerExternosById(idExterno);
};

export const obtenerExternoByCedula = async (cedulaExterno) => {
  return externos.obtenerExternoByCedula(cedulaExterno);
};

export const obtenerEmpresas = async () => {
  return empresas.obtenerEmpresas();
};

export const obtenerEmpresaById = async (idEmpresa) => {
  return empresas.obtenerEmpresaById(idEmpresa);
};

export const crearEmpresa = async (empresa) => {
  empresas.crearEmpresa(empresa);
};

export const obtenerTG = async () => {
  return tgs.obtenerTG();
};

export const obtenerTGById = async (idTG) => {
  return tgs.obtenerTGById(idTG);
};

export const crearTrabajoGradoExperimental = async ( TG, cedulaEstudiante,cedulaTutorAcademico,id_empresa) => {
  tgs.crearTrabajoGradoExperimental(TG, cedulaEstudiante, cedulaTutorAcademico,id_empresa);
};

export const crearTrabajoGradoInstrumental = async ( TG, cedulaEstudiante,cedulaTutorExperimental,id_empresa ) => {
  tgs.crearTrabajoGradoInstrumental(TG, cedulaEstudiante, cedulaTutorExperimental,id_empresa);
};

export const obtenerPropuestas = async ( estatus ) => {
  console.log('estoy en api');
  return tgs.obtenerPropuestas(estatus);
};

export const obtenerPropuestasSinTutorAcademicoAsignado = async ( ) => {
  const tgs = await fetch(domain_url_env+'/SinTutorAcademicoAsignado');
  const respuesta = await tgs.json()
  console.log(respuesta)
  return respuesta;
};
export const eliminarPlanilla = async ( idTg ) => {
  tgs.eliminarPlanilla(idTg);
};

export const actualizarPlanilla = async ( planilla ) => {
  tgs.actualizarPlanilla(planilla);
};

export const obtenerPropuestaSinRevisor = async ( ) => {
  return tgs.obtenerPropuestaSinRevisor();
};

export const obtenerComites = async ( estatus ) => {
  return comites.obtenerComites(estatus);
};

export const rechazarPropuestaComite = async ( id_tg ) => {
  comites.rechazarPropuestaComite(id_tg);
};

export const aprobarPropuestaComite = async ( id_tg ) => {
  comites.aprobarPropuestaComite(id_tg);
};

export const obtenerCTG = async ( ) => {
  return comites.obtenerCTG();
};
//Aja
export const aprobarPropuestaCTG = async ( id_tg,id_ctg,decision_ctg,comentario) => {
  try {
    const peticion =  await fetch(domain_url_env+ '/revisa_CTG',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_ctg: id_ctg,
        id_tg: id_tg,
        decision_ctg: decision_ctg,
        comentario: comentario
      })
  });
  const respuesta = await peticion.json();
  console.log(respuesta)
  return respuesta;
  } catch (error) {
    console.log("Error en aprobación de propuesta por parte del consejo")
    console.log(error)
  }

};
//Aja
export const rechazarPropuestaCTG = async ( id_tg,id_ctg,decision_ctg,comentario ) => {
  fetch(domain_url_env+'/revisa_CTG',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_ctg: id_ctg,
        id_tg: id_tg,
        decision_ctg: decision_ctg,
        comentario: comentario
      })
  })
  .then((response) =>{
    return response.json()
  })
  .then( (data)  => {
    console.log(data)
  })
};

export const designarRevisor = async ( id_tg, id_profesor_revisor) => {
  return comites.designarRevisor(id_tg, id_profesor_revisor);
};

export const obtenerEstudianteDeTG = async ( id_tg ) => {
  return tgs.obtenerEstudianteDeTG(id_tg);
};

export const obtenerPropuestaConRevisorAsignado = async ( ) => {
  return tgs.obtenerPropuestaConRevisorAsignado();
};

export const aprobarPropuestaRevisor = async ( id_tg, observaciones_revisor) => {
  return revisores.aprobarPropuestaRevisor(id_tg,observaciones_revisor);
};

export const rechazarPropuestaRevisor = async ( id_tg, observaciones_revisor) => {
  return revisores.rechazarPropuestaRevisor(id_tg,observaciones_revisor);
};

export const rechazarPropuestaCDE = async ( id_tg ) => {
  return cde.rechazarPropuestaCDE(id_tg);
};

export const aprobarPropuestaCDE = async ( id_tg,id_cde,comentario ) => {
  return cde.aprobarPropuestaCDE(id_tg,id_cde,comentario);
};

export const asignarTutorAcademico = async ( id_tg, id_tutor_academico,observaciones ) => {
  return cde.asignarTutorAcademico(id_tg, id_tutor_academico,observaciones);
};

export const obtenerCDE = async ( ) => {
  return cde.obtenerCDE();
};

export const obtenerCDEById = async ( id_cde ) => {
  return cde.obtenerCDEById(id_cde);
};

export const anexarPlanilla = async ( id_tg, nombre_planilla, documento) => {
  return tgs.anexarPlanilla(id_tg, nombre_planilla, documento);
};

export const crearCDE = async (id_cde) =>{
  return cde.crearCDE(id_cde);
};

export const obtenerTGsinJurado = async () =>{
  return tgs.obtenerTGsinJurado();
};

export const obtenerTGconJurado = async () =>{
  return tgs.obtenerTGconJurado();
};

export const crearJuradosPorUno = async (jurado, id_tg) => {
  return cde.crearJuradosPorUno(jurado, id_tg);
};

export const crearJurados = async (array, id_tg) => {
  cde.crearJurados(array, id_tg);
  return;
};

export const designarCDEJurado = async (id_tg , id_cde,observaciones_cde_j) => {
  fetch(domain_url_env+'/designarCDEJurado',{
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_tg: id_tg,
        id_cde: id_cde,
        observaciones_cde_j: observaciones_cde_j
      })
    })
    .then( (response) => {
      return response.json()
    })
    .then( (data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error)
    })
  return;
};

export const buscarAdministradores = async (cedula) => {
  try {
    const respuesta = await fetch(domain_url_env+'/Administradores',{
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cedula: cedula
      })
    })
    const resultado = await respuesta.json();
    return resultado
  } catch (error) {
    console.log(error)
  }

}

export const encriptarContrasena = async (contrasena) => {
  const encriptado = (contrasena)
  console.log(encriptado)
  return encriptado
}

export const defensaTrabajoDeGrado = async (id_tg, fecha_entrega_informe, fecha_defensa, mencion, razon_mencion, alumnos) => {
  return await tgs.defensaTrabajoDeGrado(id_tg, fecha_entrega_informe, fecha_defensa, mencion, razon_mencion, alumnos);
}

/* Catálogo de funciones para el manejo de las entidades estudiantes  */
export const añadirEstudiante = async (estudiante) => {
  const respuesta = await estudiantes.insertarEstudiantes(estudiante);
  console.log(respuesta)
  return;
}

export const eliminarEstudiante = async (id) => {
  const respuesta = await estudiantes.eliminarEstudiante(id);
  return;
}

export const actualizarEstudiante = async (estudiante) => {
  const respuesta = await estudiantes.actualizarEstudiante(estudiante);
  return;
}

/* Catálogo de funciones para el manejo de las entidades profesores  */
export const añadirProfesor = async (profesor) => {
  const respuesta = await profesores.añadirProfesor(profesor);
  console.log(respuesta)
  return;
}

export const eliminarProfesor = async (id) => {
  const respuesta = await profesores.eliminarProfesor(id);
  return;
}

export const actualizarProfesor = async (profesor) => {
  const respuesta = await profesores.actualizarProfesor(profesor);
  return;
}

/* Catálogo de funciones para el manejo de la entidad Empresas */

export const eliminarEmpresa = async (id) => {
  const respuesta = await empresas.eliminarEmpresa(id);
  return;
}

export const actualizarEmpresa = async (empresa) => {
  const respuesta = await empresas.actualizarEmpresa(empresa);
  return;
}

/* Catálogo de funciones para el manejo de la entidad Externos */
export const añadirExterno = async (externo) => {
  const respuesta = await externos.añadirExterno(externo);
  return;
}

export const eliminarExterno = async (id) => {
  const respuesta = await externos.eliminarExterno(id);
  return;
}

export const actualizarExterno = async (externo) => {
  const respuesta = await externos.actualizarExterno(externo);
  return;
}

/* Catálogo de funciones para el manejo de la entidad Consejo de Escuela */

export const añadirCDE = async (consejo) => {
    await cde.crearCDE(consejo);
}

export const actualizarCDE = async (consejo_escuela) => {
    console.log("actualizarCDE()");
    await cde.actualizarConsejo(consejo_escuela)
    //const peticion = await cde.actualizarCDE(cde)
}

export const eliminarCDE = async (id_consejo) => {
    await cde.eliminarCDE(id_consejo)
}

/* Catálogo de funciones para el manejo de la entidad Comite de trabajo de grado */

export const obtenerComitesByID = async (id) => {
    const comiteRequest = await comites.obtenerComitesByID(id);
    //console.log(comiteRequest)
    return comiteRequest;
}

export const eliminarComite = async (id) => {
    const comiteRequest = await comites.eliminarComite(id);
}

export const actualizarComite = async (comite) => {
    const comiteRequest = await comites.actualizarComite(comite);
}

export const añadirComite = async (comite) => {
  const comiteRequest = await comites.añadirComite(comite);
}

/* En el siguiente comentario se anexa el esquema de la clase para regerar la planilla */
/* 
      PlanillaPropuestaTEG = {
        titulo,
        organizacion,
        alumnos: [
          {
            nombres,
            apellidos,
            cedula,
            telefono,
            email,
          }
        ],
        tutor_academico: {
            nombres,
            apellidos,
            cedula,
            email,
            oficina,
            telefono,
            profesion,
            experiencia,
            fecha_graduado,
            cargo,
            fecha_entrega
        },
        empresa: {
          nombre,
          direccion,
          telefono
        }
      }


*/
export const regenerarPlanillaPropuestaTEG = async (id_tg) => {
      const trabajo_de_grado = await obtenerTGById(id_tg)
      const alumnos = await obtenerEstudianteDeTG(id_tg);
      //const empresa = await obtenerEmpresaById(trabajo_de_grado.id_empresa);
      //const tutor = await obtenerProfesorByCedula(trabajo_de_grado.id_tutor_academico)
} 

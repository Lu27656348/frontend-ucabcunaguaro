import { async } from '@firebase/util';
import {domain_url_env} from '../../config.js'
export const obtenerTG = async () => {
  const resTG = await fetch(domain_url_env+'/TG/');
  const tg = await resTG.json();
  //console.log("obtenerTG()");
  //console.log(tg);
  return tg;
};

export const obtenerTGById = async (idTG) => {
  const resTG = await fetch(domain_url_env+'/TG/' + idTG);
  const tg = await resTG.json();
  //console.log("obtenerTGById()");
  //console.log(tg);
  return tg;
};

export const crearTrabajoGradoExperimental = async ( TG, cedulaEstudiante,cedulaTutorAcademico,id_empresa) => {
  console.log("crearTrabajoGrado")
  fetch(domain_url_env+'/TG',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titulo: TG.titulo,
      modalidad: TG.modalidad,
      id_tutor_academico: cedulaTutorAcademico,
      id_tutor_empresarial: null,
      id_empresa: id_empresa
    })
  })
  .then( (response) =>{
    console.log("response")
    console.log(response)
    return response.json()
  })
  .then( (data) => {
    console.log("data")
    console.log(data)
    console.log(data.id_tg)
    if( cedulaEstudiante.length == 1 ){
      const objeto = {
        cedula_estudiante: cedulaEstudiante[0].cedula,
        id_tg: data.id_tg
      }
      fetch(domain_url_env+'/realiza_TG',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objeto)
      })
      .then( (response) => {
        console.log(response)
        return response.json()
      })
      .then( (data) => {
        console.log(data)
      })
      .catch( (error) => {
        console.log("Error en creacion de realiza");
        console.log(error);
      })
    }else if (cedulaEstudiante.length > 1){
      console.log("Se detectaron 2 alumnos");


      fetch(domain_url_env+'/realiza_TG',{
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cedula_estudiante: cedulaEstudiante[0].cedula,
          id_tg: data.id_tg
        })
      }).then( (respuesta) => {
        return respuesta.json()
      }).then( ( data) =>{
        console.log("Estudiante insertado ", data)
      } )

      fetch(domain_url_env+'/realiza_TG',{
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cedula_estudiante: cedulaEstudiante[1].cedula,
          id_tg: data.id_tg
        })
      }).then( (respuesta) => {
        return respuesta.json()
      }).then( ( data) =>{
        console.log("Estudiante insertado ", data)
      } )

 
    }

  })
  .catch( (error) => {
    console.log("Error en creacion de TG desde la api - con dos alumnos");
    console.log(error)
  })
};

export const crearTrabajoGradoInstrumental = async ( TG, cedulaEstudiante,cedulaTutorExperimental,id_empresa ) => {
  console.log("API/crearTrabajoGrado()");
  fetch(domain_url_env+'/TG',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titulo: TG.titulo,
      modalidad: TG.modalidad,
      id_tutor_academico: null,
      id_tutor_empresarial: cedulaTutorExperimental,
      id_empresa: id_empresa
    })
  })
  .then( (response) =>{
    console.log("response")
    console.log(response)
    return response.json()
  })
  .then( (data) => {
    console.log("data")
    console.log(data)
    console.log(data.id_tg)
    
    if (cedulaEstudiante.length == 1){
      const objeto = {
        cedula_estudiante: cedulaEstudiante[0].cedula,
        id_tg: data.id_tg
      }
      fetch(domain_url_env+'/realiza_TG',{
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
      })
      .then( (response) => {
        console.log(response)
        return response.json()
      })
      .then( (data) => {
        console.log(data)
      })
      .catch( (error) => {
        console.log("Error en creacion de realiza");
        console.log(error);
      })
    }else if(cedulaEstudiante.length > 1){
      console.log("Se detectaron 2 alumnos");
      cedulaEstudiante.forEach( async (element) => {
        if(element != undefined && element != null){
          try {
            let peticion = await fetch(domain_url_env+'/realiza_TG',{
            method: 'POST',
            mode: 'cors',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              cedula_estudiante: element.cedula,
              id_tg: data.id_tg
            })
          });
          let respuesta = await peticion.json();
          console.log(respuesta)
          } catch (error) {
            console.error(error)
          }
        }
      })
    }
    
  })
  .catch( (error) => {
    console.log("Error en creacion de TG desde la api");
    console.log(error)
  })
};

export const obtenerPropuestas = async ( estatus ) => {
  const resTG = await fetch(domain_url_env+'/TG/estatus/'+estatus);
  const tg = await resTG.json();
  //console.log("obtenerTG()");
  //console.log(tg);
  return tg;
};

export const eliminarPlanilla = async ( idTg ) => {
  await fetch(domain_url_env+'/TG/' + idTg,{method: 'DELETE'});
};

export const actualizarPlanilla = async ( planilla ) => {
  await fetch(domain_url_env+'/TG/' + planilla.id_tg,{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titulo: planilla.titulo,
      modalidad: planilla.modalidad,
    })
  });
};

export const obtenerPropuestaSinRevisor = async ( ) => {
  const resTG = await fetch(domain_url_env+'/sin_revisor/');
  const tg_sin_revisor = await resTG.json();
  return tg_sin_revisor
};

export const obtenerEstudianteDeTG = async ( id_tg ) => {
  const resEstudiantes = await fetch(domain_url_env+"/alumnosTG/" + id_tg);
  const estudiantes = await resEstudiantes.json();
  console.log("estudiantes")
  console.log(estudiantes)
  let lista = [];
  estudiantes.forEach(element => {
   if(element.realiza_tg!=null){
     lista.push(element.realiza_tg.estudiante)
   }else{
     console.log("No se puede agregar alumno")
   }
  });
  console.log("lista");
  return lista;
};

export const obtenerPropuestaConRevisorAsignado = async ( ) => {
  const resTG = await fetch(domain_url_env+'/con_revisor/');
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor
};

export const anexarPlanilla = async ( id_tg, nombre_planilla, documento) => {
  const resPlanilla = await fetch(domain_url_env+'/anexarPlanilla/',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_tg: id_tg,
      nombre_planilla: nombre_planilla,
      documento: documento
    })
  });
  const planilla = await resPlanilla.json()
  return planilla;
};

export const obtenerTGsinJurado = async () =>{
  console.log("obtenerTGsinJurado()");
  const resJurado = await fetch(domain_url_env+'/sinJurado/');
  const jurados = await resJurado.json()
  return jurados;
};

export const obtenerTGconJurado = async () =>{
  console.log("obtenerTGconJurado()");
  const resJurado = await fetch(domain_url_env+'/conJurado/');
  const jurados = await resJurado.json()
  return jurados;
};

export const obtenerTGconJuradoRealizaTG = async () =>{
  console.log("obtenerTGconJuradoRealizaTG()");
  const resJurado = await fetch(domain_url_env+'/conJuradoRealizaTG/');
  const jurados = await resJurado.json()
  return jurados;
};

export const obtenerJuradosDeTG = async (id_tg) =>{
  console.log("obtenerJuradosDeTG()");
  const resJurado = await fetch(domain_url_env+'/Jurado/buscar/',{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_tg: id_tg
    })
  });
  const jurados = await resJurado.json()
  return jurados;
};

export const defensaTrabajoDeGrado = async (id_tg, fecha_entrega_informe, fecha_defensa, mencion, razon_mencion, alumnos) =>{
  console.log("defensaTrabajoDeGrado()");
  const resJurado = await fetch(domain_url_env+'/defensaTrabajoDeGrado',{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_tg: id_tg,
      fecha_entrega_informe: fecha_entrega_informe,
      fecha_defensa: fecha_defensa,
      mencion: mencion,
      razon_mencion: razon_mencion,
      alumnos: alumnos
    })
  });
  const jurados = await resJurado.json()
  console.log("jurados")
  console.log(jurados)
  console.log(resJurado)
  //return jurados;
};

export const obtenerEstudiantesRealizaTG = async () => {
  const trabajos = await fetch(domain_url_env+'/realiza_TG/estudiantesRealizaTG');
  const respuesta = await trabajos.json()
  return respuesta;
}
export const obtenerEstudiantesSinRevisorRealizaTG = async () => {
  const trabajos = await fetch(domain_url_env+'/sin_revisorRealizaTG');
  const respuesta = await trabajos.json()
  return respuesta;
}

export const obtenerEstudiantesConRevisorRealizaTG = async () => {
  const trabajos = await fetch(domain_url_env+'/con_revisorRealizaTG');
  const respuesta = await trabajos.json()
  return respuesta;
}


export const obtenerTGSinConsejoEscuelaRealizaTG = async () => {
  const trabajos = await fetch(domain_url_env+'/obtenerTGSinConsejoEscuelaRealizaTG');
  const respuesta = await trabajos.json()
  return respuesta;
}

export const obtenerTGSinTutorAsignadoRealizaTG = async () => {
  const trabajos = await fetch(domain_url_env+'/obtenerTGSinTutorAsignadoRealizaTG');
  const respuesta = await trabajos.json()
  return respuesta;
}

export const obtenerTGSinJuradoAsignadoRealizaTG = async () => {
  const trabajos = await fetch(domain_url_env+'/obtenerTGSinJuradoAsignadoRealizaTG');
  const respuesta = await trabajos.json()
  return respuesta;
}

export const crearAdministradores = async (administrador) => {
  const trabajos = await fetch(domain_url_env+'/Administradores',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(administrador)
  });
  const respuesta = await trabajos.json()
  return respuesta;
}

export const actualizarAdministradores = async (administrador) => {
  const trabajos = await fetch(domain_url_env+'/actualizarAdministradores',{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(administrador)
  });
  const respuesta = await trabajos.json()
  return respuesta;
}


export const obtenerAdministradores = async () => {
  const trabajos = await fetch(domain_url_env+'/Administradores');
  const respuesta = await trabajos.json()
  return respuesta;
}


export const obtenerAdministradoresSinProfesor = async (administrador) => {
  const trabajos = await fetch(domain_url_env+'/AdministradoresSinProfesor');
  const respuesta = await trabajos.json()
  return respuesta;
}
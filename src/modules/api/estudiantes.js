import { domain_url_env } from '../../config.js';

export const insertarEstudiantes = async (estudiante) =>{
  const insertar = await fetch(domain_url_env+'/Estudiantes',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estudiante)
  });
  const respuesta = await insertar.json();
  return respuesta;
};

export const eliminarEstudiante = async (id) =>{
  const eliminar = await fetch(domain_url_env+'/Estudiantes/'+id,{
      method: 'DELETE',
      mode: 'cors'
  });
};

export const actualizarEstudiante = async (estudiante) =>{
  const eliminar = await fetch(domain_url_env+'/Estudiantes/'+estudiante.cedula,{
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(estudiante)
  });
};

export const obtenerEstudiantes = async () => {
  const resEstudiantes = await fetch(domain_url_env+'/Estudiantes');
  const estudiantes = await resEstudiantes.json();
  //console.log("obtenerEstudiantes()");
  //console.log(estudiantes);
  return estudiantes;
};

export const obtenerEstudianteByCedula = async (cedulaEstudiante) =>{
  const resEstudiante = await fetch(domain_url_env+'/Estudiantes/'+cedulaEstudiante);
  const estudiante = await resEstudiante.json();
  //console.log("obtenerEstudianteByCedula()");
  //console.log(estudiante);
  return estudiante;
};
export const añadirProfesor = async (profesor) => {
  const profesorNuevo = await fetch(domain_url_env+'/Profesores',{
    method: "POST",
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profesor)
  });
}
export const actualizarProfesor = async (profesor) => {
  const profesorActualizado = await fetch(domain_url_env+'/Profesores/'+ profesor.cedula,{
    method: "PUT",
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profesor)
  });
}

export const eliminarProfesor = async (id) => {
  const profesor = await fetch(domain_url_env+'/Profesores/'+ id,{
    method: "DELETE",
    mode: 'cors'
  });
}
export const obtenerProfesores = async () => {
  const resProfesores = await fetch(domain_url_env+'/Profesores');
  const profesores = await resProfesores.json();
  //console.log("obtenerProfesores()");
  //console.log(profesores);
  return profesores;
};

export const obtenerProfesorByCedula = async (cedulaProfesor) => {
  const resProfesor = await fetch(domain_url_env+'/Profesores/' + cedulaProfesor );
  const profesor = await resProfesor.json();
  //console.log("obtenerProfesorByCedula()");
  //console.log(cedulaProfesor)
  //console.log(profesor);
  return profesor;
};
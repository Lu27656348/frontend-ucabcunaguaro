export const añadirProfesor = async (profesor) => {
  const profesorNuevo = await fetch('http://localhost:3000/Profesores',{
    method: "POST",
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profesor)
  });
}
export const actualizarProfesor = async (profesor) => {
  const profesorActualizado = await fetch('http://localhost:3000/Profesores/'+ profesor.cedula,{
    method: "PUT",
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profesor)
  });
}

export const eliminarProfesor = async (id) => {
  const profesor = await fetch('http://localhost:3000/Profesores/'+ id,{
    method: "DELETE",
    mode: 'cors'
  });
}
export const obtenerProfesores = async () => {
  const resProfesores = await fetch('http://localhost:3000/Profesores');
  const profesores = await resProfesores.json();
  //console.log("obtenerProfesores()");
  //console.log(profesores);
  return profesores;
};

export const obtenerProfesorByCedula = async (cedulaProfesor) => {
  const resProfesor = await fetch('http://localhost:3000/Profesores/' + cedulaProfesor );
  const profesor = await resProfesor.json();
  //console.log("obtenerProfesorByCedula()");
  //console.log(cedulaProfesor)
  //console.log(profesor);
  return profesor;
};
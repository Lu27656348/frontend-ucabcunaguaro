export const insertarEstudiantes = async (estudiante) =>{
  const insertar = await fetch('http://localhost:3000/Estudiantes',{
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
  const eliminar = await fetch('http://localhost:3000/Estudiantes/'+id,{
      method: 'DELETE',
      mode: 'cors'
  });
};

export const actualizarEstudiante = async (estudiante) =>{
  const eliminar = await fetch('http://localhost:3000/Estudiantes/'+estudiante.cedula,{
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(estudiante)
  });
};

export const obtenerEstudiantes = async () => {
  const resEstudiantes = await fetch('http://localhost:3000/Estudiantes');
  const estudiantes = await resEstudiantes.json();
  //console.log("obtenerEstudiantes()");
  //console.log(estudiantes);
  return estudiantes;
};

export const obtenerEstudianteByCedula = async (cedulaEstudiante) =>{
  const resEstudiante = await fetch('http://localhost:3000/Estudiantes/'+cedulaEstudiante);
  const estudiante = await resEstudiante.json();
  //console.log("obtenerEstudianteByCedula()");
  //console.log(estudiante);
  return estudiante;
};
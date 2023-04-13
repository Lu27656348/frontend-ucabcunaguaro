export const rechazarPropuestaCDE = async ( id_tg ) => {
  const resTG = await fetch('http://localhost:3000/TG/evaluacionCDE/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desicion_cde: 'R'
    })
  });
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor
};

export const aprobarPropuestaCDE = async ( id_tg,id_cde,comentario ) => {
  console.log("aprobarPropuestaCDE()")
  console.log(id_cde)
  const resTG = await fetch('http://localhost:3000/TG/evaluacionCDE/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desicion_cde: 'A',
      id_cde: id_cde,
      observaciones_cde_t: comentario
    })
  });
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor
};

export const asignarTutorAcademico = async ( id_tg, id_tutor_academico,observaciones ) => {
  try {
    console.log("asignarTutorAcademico")
    const resTG = await fetch('http://localhost:3000/TG/asignarTutorAcademico/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_tutor_academico: id_tutor_academico,
      observaciones_cde_t: observaciones
    })
  });
  const tg_con_revisor = await resTG.json();
  console.log("tg_con_revisor")
  console.log(tg_con_revisor)
  return tg_con_revisor
  } catch (error) {
    console.error("error")
    console.error(error)
  }
  
};

export const obtenerCDE = async ( ) => {
  const resCDE = await fetch('http://localhost:3000/CDE');
  const CDE = await resCDE.json()
  return CDE;
};

export const obtenerCDEById = async ( id_cde ) => {
  const resCDE = await fetch('http://localhost:3000/CDE/'+id_cde);
  const CDE = await resCDE.json()
  return CDE;
};

export const crearCDE = async (cde) =>{
  const insertar = await fetch('http://localhost:3000/CDE',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_cde: cde.id_cde
      })
  });
  const respuesta = await insertar.json();
  console.log("crearCDE()");
  console.log(respuesta)
  return respuesta;
};

export const actualizarConsejo = async (cde) => {
  console.log("actualizarCDE() - desde la api")
  console.log(cde);
  const actualizar = await fetch('http://localhost:3000/CDE/'+cde.id_cde,{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cde)
  })
  return;
}

export const eliminarCDE = async (id_cde) =>{
  const eliminar = await fetch('http://localhost:3000/CDE/'+id_cde,{
    method: 'DELETE',
    mode: 'cors'
  })
}

export const crearJuradosPorUno = async (jurado,id_tg,index) => {
  console.log("jurado,",jurado)
  console.log("id", id_tg)
  let tipo = null;
  if(index == 3 || index == 2){
    tipo = 'S'
  }else{
    tipo = 'J'
  }
  const resJurado = await fetch('http://localhost:3000/crearJurado',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cedula_profesor: jurado,
      id_tg: id_tg,
      tipo: tipo
    })
  })
  const resultado = await resJurado.json();
  console.log(resultado);
  //console.log(resJurado);
};

export const crearJurados = async (array,id_tg) => {
  console.log("crearJurados()")
  array.forEach( async (element,index) => {
   await crearJuradosPorUno(element,id_tg,index);
 })

 return;
};
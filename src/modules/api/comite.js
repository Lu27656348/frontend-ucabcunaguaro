export const obtenerCTG = async ( ) => {
  const resCTG = await fetch('http://localhost:3000/CTG');
  const ctg = await resCTG.json();
  console.log("obtenerCTG()");
  console.log(ctg);
  return ctg;
};

export const buscarCTG = async ( id ) => {
  const resCTG = await fetch('http://localhost:3000/CTG/'+id);
  const ctg = await resCTG.json();
  console.log("buscarCTG()");
  console.log(ctg);
  return ctg;
};

export const revisionCTG = ( id_ctg, id_tg,decision_ctg ) => {
  let respuesta = null;
  fetch('http://localhost:3000/revisa_CTG',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      id_ctg: id_ctg,
      id_tg: id_tg,
      decision_ctg: decision_ctg,
      comentario: null
    })
  })
  .then( (response) => {
    return response.json()
  })
  .then( (data) => {
    //console.log(data)
    return data;
  })
  .catch( (error) => {
    return error
  })

};

export const obtenerComites = async ( estatus ) => {
  const resCDE = await fetch('http://localhost:3000/CDE');
  const cde = await resCDE.json();
  console.log("obtenerComites()");
  console.log(cde);
  return cde;
};

export const rechazarPropuestaComite = async ( id_tg ) => {
  console.log(id_tg);
  await fetch('http://localhost:3000/TG/evaluacionComite/' + id_tg,{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desicion_comite: 'R'
    })
  });
};

export const aprobarPropuestaComite = async ( id_tg,id_ctg ) => {
  
  fetch('http://localhost:3000/TG/evaluacionComite/' + id_tg,{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      decision_comite: 'PR'
  })
  })
  .then( (response) => {
    return response.json()
  } )
  .then( (data) => {
    console.log(data)
  })
};

export const designarRevisor = async ( id_tg, id_profesor_revisor) => {
  const resTG = await fetch('http://localhost:3000/asignarRevisor/'+id_tg,{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_profesor_revisor: id_profesor_revisor
    })
  });
  
  const tg_revisor = await resTG.json();
  return tg_revisor
};

export const obtenerComitesByID = async (id_comite) => {
  const comiteRequest = await fetch('http://localhost:3000/CTG/'+id_comite);
  const respuesta = await comiteRequest.json();
  return respuesta;
}

export const eliminarComite = async (id_comite) => {
  const comiteRequest = await fetch('http://localhost:3000/CTG/'+id_comite,{
    method: 'DELETE',
    mode: 'cors'
  });
}

export const añadirComite = async (comite) => {
  const comiteRequest = await fetch('http://localhost:3000/CTG/',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comite)
  });
}

export const actualizarComite = async (comite) => {
  const comiteRequest = await fetch('http://localhost:3000/CTG/'+comite.id_ctg,{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comite)
  });
  const respuesta = await comiteRequest.json();
  return respuesta;
}
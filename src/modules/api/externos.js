export const obtenerExternos = async () => {
  const resExternos = await fetch('http://localhost:3000/Externos/');
  const externos = await resExternos.json();
  //console.log("obtenerExternos()");
  //console.log(externos);
  return externos;
};

export const obtenerExternosById = async ( idExterno) => {
  const resExternos = await fetch('http://localhost:3000/Externos/' + idExterno);
  const externos = await resExternos.json();
  //console.log("obtenerExternosById()");
  //console.log(externos);
  return externos;
};

export const obtenerExternoByCedula = async (cedulaExterno) => {
  const resExterno = await fetch('http://localhost:3000/Externos/cedula/' + cedulaExterno );
  const externo = await resExterno.json();
  console.log("obtenerExternoByCedula()");
  return externo;
};

export const añadirExterno = async (externo) => {
    const resExterno = await fetch('http://localhost:3000/Externos/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(externo)
    });
}

export const actualizarExterno = async (externo) => {
  const resExterno = await fetch('http://localhost:3000/Externos/'+externo.id_externo, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(externo)
  });
}

export const eliminarExterno = async (id_externo) => {
  const resExterno = await fetch('http://localhost:3000/Externos/'+id_externo, {
    method: 'DELETE',
    mode: 'cors',
  });
}
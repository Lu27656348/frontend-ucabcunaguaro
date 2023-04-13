export const obtenerEmpresas = async () => {
  const resEmpresas = await fetch(domain_url_env+'/Empresas/' );
  const empresas = await resEmpresas.json();
  //console.log("obtenerEmpresas()");
  //console.log(empresas);
  return empresas;
};

export const obtenerEmpresaById = async (idEmpresa) => {
  const resEmpresa = await fetch(domain_url_env+'/Empresas/' + idEmpresa );
  const empresa = await resEmpresa.json();
  //console.log("obtenerEmpresaById()");
  //console.log(empresa);
  return empresa;
};

export const crearEmpresa = async (empresa) => {
  const resEmpresa = await fetch(domain_url_env+'/Empresas/',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(empresa)
  });
};

export const actualizarEmpresa = async (empresa) => {
    const resEmpresa = await fetch(domain_url_env+'/Empresas/'+empresa.id_empresa,{
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(empresa)
    });
}

export const eliminarEmpresa = async (id) => {
    const resEmpresa = await fetch(domain_url_env+'/Empresas/'+id,{
      method: "DELETE",
      mode: 'cors'
    });
    return;
}
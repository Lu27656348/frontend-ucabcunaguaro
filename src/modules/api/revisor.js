import { domain_url_env} from '../../config.js'
export const aprobarPropuestaRevisor = async ( id_tg, observaciones_revisor ) => {
  const resTG = await fetch(domain_url_env+'/TG/evaluacionRevisor/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      decision_revisor: 'A',
      estatus: 'PE',
      observaciones_revisor: observaciones_revisor
    })
  });
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor
};

export const rechazarPropuestaRevisor = async ( id_tg,observaciones_revisor ) => {
  const resTG = await fetch(domain_url_env+'/TG/evaluacionRevisor/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      decision_revisor: 'R',
      estatus: 'R',
      observaciones_revisor: observaciones_revisor
    })
  });
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor
};
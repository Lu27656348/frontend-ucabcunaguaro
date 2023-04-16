import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import '../assets/styles/main.css';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'login', component: ()=> import('../views/login.vue') },
    { path: '/requests', name: 'requests', component: ()=> import('../views/requests.vue') },
    { path: '/committee', name: 'comittee', component: ()=> import('../views/committee.vue') },
    { path: '/reviewers', name: 'reviewers', component: ()=> import('../views/reviewers.vue') },
    { path: '/reviewers_evaluation', name: 'reviewers_evaluation', component: ()=> import('../views/reviewers_evaluation.vue') },
    { path: '/consejo', name: 'consejo', component: ()=> import('../views/consejo.vue') },
    { path: '/assignment', name: 'assignment', component: ()=> import('../views/assignment.vue') },
    { path: '/designarJurado', name: 'designarJurado', component: ()=> import('../views/jury.vue') },
    { path: '/evaluacionNotas', name: 'evaluacionNotas', component: ()=> import('../views/noteUpload.vue') },
    { path: '/catalogs', name: 'catalogs', component: ()=> import('../views/catalogs.vue') },
    { path: '/catalogs/estudiantes', name: 'catalogs-students', component: ()=> import('../views/catalogs-students.vue') },
    { path: '/catalogs/profesores', name: 'catalogs-professor', component: ()=> import('../views/catalogs-professor.vue') },
    { path: '/catalogs/empresas', name: 'catalogs-empresas', component: ()=> import('../views/catalogs-empresas.vue') },
    { path: '/catalogs/externos', name: 'catalogs-externos', component: ()=> import('../views/catalogs-externos.vue') },
    { path: '/catalogs/consejo', name: 'catalogs-consejo', component: ()=> import('../views/catalogs-consejo.vue') },
    { path: '/catalogs/comite', name: 'catalogs-comite', component: ()=> import('../views/catalogs-comite.vue') },
    { path: '/catalogs/admins', name: 'catalogs-admins', component: ()=> import('../views/catalogs-administradores.vue') }
  ]
});

router.beforeEach((to, from) => {
  
  const usuario = localStorage.getItem('usuario');

  if ( usuario == null && to.name != 'login' ){
    alert('Usted no tiene autorizacion para usar la aplicación.\nRedirigiendo a inicio de sesión.')
    return {
      name: 'login'
    };
  };

  if ( usuario != null && to.name == 'login' ){
    alert('Usted ya está autorizado para usar la aplicación.\nRedirigiendo a Propuestas de Trabajo de grado.')
    return {
      name: 'requests'
    };
  };

  return true;
});

export default router;
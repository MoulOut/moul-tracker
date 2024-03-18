import Projetos from '@/views/Projetos.vue';
import Formulario from '@/views/Projetos/Formulario.vue';
import Tarefas from '@/views/Tarefas.vue';
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: Tarefas,
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component: Projetos,
  },
  {
    path: '/projetos/novo',
    name: 'Novo Projeto',
    component: Formulario,
  },
  {
    path: '/projetos/:id',
    name: 'Editar Projeto',
    component: Formulario,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

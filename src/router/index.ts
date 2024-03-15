import Projetos from '@/views/Projetos.vue';
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

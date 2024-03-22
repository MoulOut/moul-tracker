import clientHttp from '@/http';
import ITarefa from '@/interface/ITarefa';
import { Estado } from '@/store';
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_TAREFAS,
} from '@/store/tipo-actions';
import {
  ADICIONA_TAREFA,
  ALTERA_TAREFA,
  DEFINIR_TAREFAS,
} from '@/store/tipo-mutations';
import { Module } from 'vuex';

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(
        (task) => task.descricao === tarefa.descricao
      );

      state.tarefas[index] = tarefa;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      return clientHttp
        .get('/tarefas')
        .then((response) => commit(DEFINIR_TAREFAS, response.data))
        .catch((error) => console.error(error));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return clientHttp
        .post('/tarefas', tarefa)
        .then((response) => commit(ADICIONA_TAREFA, response.data));
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return clientHttp
        .put(`/tarefas/${tarefa.id}`, tarefa)
        .then((response) => commit(ALTERA_TAREFA, response.data));
    },
  },
};

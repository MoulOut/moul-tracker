import IProjeto from '@/interface/IProjeto';
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import {
  ADICIONA_PROJETO,
  ADICIONA_TAREFA,
  ALTERA_PROJETO,
  ALTERA_TAREFA,
  DEFINIR_PROJETOS,
  DEFINIR_TAREFAS,
  EXCLUIR_PROJETO,
  NOTIFICAR,
} from './tipo-mutations';
import { INotificacao } from '@/interface/INotificacao';
import ITarefa from '@/interface/ITarefa';
import {
  ALTERAR_PROJETO,
  ALTERAR_TAREFA,
  CADASTRAR_PROJETO,
  CADASTRAR_TAREFA,
  EXCLUI_PROJETO,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from './tipo-actions';
import clientHttp from '@/http';

interface Estado {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
  tarefas: ITarefa[];
}

export const storeKey: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [],
    tarefas: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;

      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => projeto.id === proj.id);

      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((projetos) => projetos.id !== id);
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes.pop();
      }, 3000);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
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
    [OBTER_PROJETOS]({ commit }) {
      clientHttp
        .get('/projetos')
        .then((response) => commit(DEFINIR_PROJETOS, response.data))
        .catch((error) => console.error(error));
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return clientHttp.post('/projetos', { nome: nomeDoProjeto });
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
      return clientHttp.put(`/projetos/${projeto.id}`, projeto);
    },
    [EXCLUI_PROJETO]({ commit }, projetoId: string) {
      return clientHttp
        .delete(`/projetos/${projetoId}`)
        .then(() => commit(EXCLUIR_PROJETO, projetoId));
    },
    [OBTER_TAREFAS]({ commit }) {
      clientHttp
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
});

export function useStore(): Store<Estado> {
  return vuexUseStore(storeKey);
}

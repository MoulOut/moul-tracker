import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import { NOTIFICAR } from './tipo-mutations';
import { INotificacao } from '@/interface/INotificacao';
import { EstadoProjeto, projeto } from './modules/projeto';
import { EstadoTarefa, tarefa } from './modules/tarefa';

export interface Estado {
  notificacoes: INotificacao[];
  tarefa: EstadoTarefa;
  projeto: EstadoProjeto;
}

export const storeKey: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    tarefa: {
      tarefas: [],
    },
    projeto: {
      projetos: [],
    },
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes.pop();
      }, 3000);
    },
  },
  modules: { projeto, tarefa },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(storeKey);
}

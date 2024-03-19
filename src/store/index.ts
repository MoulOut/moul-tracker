import IProjeto from '@/interface/IProjeto';
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
} from './tipo-mutations';
import { INotificacao, TipoNotificacao } from '@/interface/INotificacao';

interface Estado {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const storeKey: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [
      {
        id: 1,
        texto: 'Uma notificacao de sucesso',
        titulo: 'Sucesso',
        tipo: TipoNotificacao.SUCESSO,
      },
      {
        id: 2,
        texto: 'Uma notificacao de atenção',
        titulo: 'Atenção',
        tipo: TipoNotificacao.ATENCAO,
      },
      {
        id: 3,
        texto: 'Uma notificacao de falha',
        titulo: 'Falha',
        tipo: TipoNotificacao.FALHA,
      },
    ],
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
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(storeKey);
}

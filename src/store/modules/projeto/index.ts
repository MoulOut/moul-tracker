import clientHttp from '@/http';
import IProjeto from '@/interface/IProjeto';
import { Estado } from '@/store';
import {
  ALTERAR_PROJETO,
  CADASTRAR_PROJETO,
  EXCLUI_PROJETO,
  OBTER_PROJETOS,
} from '@/store/tipo-actions';
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  DEFINIR_PROJETOS,
  EXCLUIR_PROJETO,
} from '@/store/tipo-mutations';
import { Module } from 'vuex';

export interface EstadoProjeto {
  projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
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
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
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
  },
};

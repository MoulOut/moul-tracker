<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import useNotificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interface/INotificacao';
import { useStore } from '@/store';
import { EXCLUI_PROJETO, OBTER_PROJETOS } from '@/store/tipo-actions';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Lista',
  methods: {
    excluir(idProjeto: string) {
      this.store
        .dispatch(EXCLUI_PROJETO, idProjeto)
        .then(() =>
          this.notificar(
            TipoNotificacao.SUCESSO,
            'Sucesso',
            'Projeto deletado.'
          )
        )
        .catch(() =>
          this.notificar(
            TipoNotificacao.FALHA,
            'Falha',
            'Erro ao deletar Projeto'
          )
        );
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    store.dispatch(OBTER_PROJETOS);
    return {
      projetos: computed(() => store.state.projeto.projetos),
      store,
      notificar,
    };
  },
});
</script>

<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field" type="submit">
        <button class="button">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interface/INotificacao';
import { useStore } from '@/store';
import { defineComponent } from 'vue';
import useNotificar from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-actions';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Formulario',
  props: { id: { type: String } },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find(
        (project) => project.id === this.id
      );
      this.nomeDoProjeto = projeto?.nome || '';
    }
  },
  data() {
    return {
      nomeDoProjeto: '',
    };
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store
          .dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto,
          })
          .then(() => this.casoDeSucesso());
      } else {
        if (!this.nomeDoProjeto) {
          return this.notificar(
            TipoNotificacao.FALHA,
            'Falha',
            'Nome do projeto precisa ser informado.'
          );
        }
        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.casoDeSucesso());
      }
    },
    casoDeSucesso() {
      this.nomeDoProjeto = '';
      this.notificar(
        TipoNotificacao.SUCESSO,
        'Sucesso',
        'O projeto foi salvo com sucesso.'
      );
      this.$router.push('/projetos');
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificar();
    return {
      store,
      notificar,
    };
  },
});
</script>

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
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-mutations';
import { defineComponent } from 'vue';
import useNotificar from '@/hooks/notificador';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Formulario',
  props: { id: { type: String } },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
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
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        });
      } else {
        if (!this.nomeDoProjeto) {
          return this.notificar(
            TipoNotificacao.FALHA,
            'Falha',
            'Nome do projeto precisa ser informado.'
          );
        }
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }
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

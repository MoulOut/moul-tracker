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
import { defineComponent, ref } from 'vue';
import useNotificar from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-actions';
import { useRouter } from 'vue-router';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Formulario',
  props: { id: { type: String } },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificar();
    const nomeDoProjeto = ref('');
    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (project) => project.id === props.id
      );
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const casoDeSucesso = () => {
      nomeDoProjeto.value = '';
      notificar(
        TipoNotificacao.SUCESSO,
        'Sucesso',
        'O projeto foi salvo com sucesso.'
      );
      router.push('/projetos');
    };

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => casoDeSucesso());
      } else {
        if (!nomeDoProjeto.value) {
          return notificar(
            TipoNotificacao.FALHA,
            'Falha',
            'Nome do projeto precisa ser informado.'
          );
        }
        store
          .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => casoDeSucesso());
      }
    };

    return {
      nomeDoProjeto,
      salvar,
    };
  },
});
</script>

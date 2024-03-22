<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import ITarefa from '@/interface/ITarefa';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interface/INotificacao';
import useNotificador from '@/hooks/notificador';

export default defineComponent({
  // eslint-disable-next-line
  name: 'Formulário',
  emits: ['salvarTarefa'],
  components: { Temporizador },
  setup(props, { emit }) {
    const descricao = ref('');
    const idProjeto = ref('');
    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      const projeto = projetos.value.find((p) => p.id === idProjeto.value);

      if (!projeto) {
        notificar(
          TipoNotificacao.ATENCAO,
          'OPS!',
          'Selecione um projeto antes de iniciar uma tarefa'
        );

        return;
      }

      emit('salvarTarefa', {
        descricao: descricao.value,
        duracaoEmSegundos: tempoDecorrido,
        projeto: projetos.value.find(
          (projeto) => projeto.id === idProjeto.value
        ),
      } as ITarefa);
      descricao.value = '';
    };

    const store = useStore();
    const { notificar } = useNotificador();
    return {
      projetos,
      notificar,
      descricao,
      idProjeto,
      finalizarTarefa,
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>

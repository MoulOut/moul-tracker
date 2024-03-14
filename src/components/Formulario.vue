<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
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
      <div class="column">
        <Temporizador @temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';
import ITarefa from '@/interface/ITarefa';

export default defineComponent({
  // eslint-disable-next-line
  name: 'Formulário',
  emits: ['salvarTarefa'],
  data() {
    return {
      descricao: '',
    };
  },
  components: { Temporizador },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('salvarTarefa', {
        descricao: this.descricao,
        duracaoEmSegundos: tempoDecorrido,
      } as ITarefa);
      this.descricao = '';
    },
  },
});
</script>

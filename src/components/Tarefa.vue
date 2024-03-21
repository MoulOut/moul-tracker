<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto.nome }}
      </div>
      <div class="column">
        <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '@/interface/ITarefa';
import Box from './Box.vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tarefa',
  components: { Cronometro, Box },
  emits: ['tarefaClicada'],
  props: {
    tarefa: { type: Object as PropType<ITarefa>, required: true },
  },
  methods: {
    tarefaClicada(): void {
      this.$emit('tarefaClicada', this.tarefa);
    },
  },
});
</script>

<style scoped>
.clicavel{
  cursor: pointer;
}
</style>
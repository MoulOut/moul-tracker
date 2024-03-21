<template>
  <Formulario @salvar-tarefa="salvaTarefa" />
  <div class="lista">
    <Tarefa
      v-for="tarefa in tarefas"
      :key="tarefa.descricao"
      :tarefa="tarefa"
    />
    <Box v-if="listaEstaVazia"
      >Você ainda não começou nenhuma tarefa hoje :(
    </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interface/ITarefa';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { OBTER_TAREFAS } from '@/store/tipo-actions';

export default defineComponent({
  name: 'App',
  components: { Formulario, Tarefa, Box },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvaTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    return {
      tarefas: computed(() => store.state.tarefas),
      store,
    };
  },
});
</script>

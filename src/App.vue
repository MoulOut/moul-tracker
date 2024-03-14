<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter">
      <Formulario @salvar-tarefa="salvaTarefa" />
      <div class="lista">
        <Tarefa
          v-for="tarefa in tarefas"
          :key="tarefa.descricao"
          :tarefa="tarefa"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import ITarefa from './interface/ITarefa';

export default defineComponent({
  name: 'App',
  components: { BarraLateral, Formulario, Tarefa },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  methods: {
    salvaTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>

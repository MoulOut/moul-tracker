<template>
  <Formulario @salvar-tarefa="salvaTarefa" />
  <div class="lista">
    <Tarefa
      v-for="tarefa in tarefas"
      :key="tarefa.descricao"
      :tarefa="tarefa"
      @tarefa-clicada="selecionarTarefa"
    />
    <Box v-if="listaEstaVazia"
      >Você ainda não começou nenhuma tarefa hoje :(
    </Box>
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div @click="fecharModal" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar Tarefa</p>
          <button
            @click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="tarefaSelecionada" class="label"> Nome da Tarefa </label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="tarefaSelecionada"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button is-success">Salvar Alterações</button>
            <button @click="fecharModal" class="button">Cancelar</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interface/ITarefa';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import {
  CADASTRAR_TAREFA,
  OBTER_TAREFAS,
  OBTER_PROJETOS,
} from '@/store/tipo-actions';

export default defineComponent({
  name: 'App',
  components: { Formulario, Tarefa, Box },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvaTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal(): void {
      this.tarefaSelecionada = null;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefas),
      projetos: computed(() => store.state.projetos),
      store,
    };
  },
});
</script>

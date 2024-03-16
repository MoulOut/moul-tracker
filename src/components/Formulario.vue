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
import { computed, defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';
import ITarefa from '@/interface/ITarefa';
import { useStore } from 'vuex';
import { storeKey } from '@/store';

export default defineComponent({
  // eslint-disable-next-line
  name: 'Formulário',
  emits: ['salvarTarefa'],
  data() {
    return {
      descricao: '',
      idProjeto: '',
    };
  },
  components: { Temporizador },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('salvarTarefa', {
        descricao: this.descricao,
        duracaoEmSegundos: tempoDecorrido,
        projeto: this.projetos.find((projeto) => projeto.id === this.idProjeto),
      } as ITarefa);
      this.descricao = '';
    },
  },
  setup() {
    const store = useStore(storeKey);
    return {
      projetos: computed(() => store.state.projetos),
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

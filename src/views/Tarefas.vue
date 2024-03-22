<template>
  <Formulario @salvar-tarefa="salvaTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar tarefas."
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Box v-if="listaEstaVazia"
      >Você ainda não começou nenhuma tarefa hoje :(
    </Box>
    <Tarefa
      v-for="tarefa in tarefas"
      :key="tarefa.descricao"
      :tarefa="tarefa"
      @tarefa-clicada="selecionarTarefa"
    />
    <Modal :mostrar="tarefaSelecionada != null" v-if="tarefaSelecionada">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editar Tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="tarefaSelecionada" class="label"> Nome da Tarefa </label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="tarefaSelecionada"
          />
        </div>
      </template>
      <template v-slot:rodape>
        <div class="buttons">
          <button @click="editaTarefa" class="button is-success">
            Salvar Alterações
          </button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interface/ITarefa';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import {
  CADASTRAR_TAREFA,
  OBTER_TAREFAS,
  OBTER_PROJETOS,
  ALTERAR_TAREFA,
} from '@/store/tipo-actions';
import useNotificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interface/INotificacao';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'App',
  components: { Formulario, Tarefa, Box, Modal },
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
      this.notificar(
        TipoNotificacao.SUCESSO,
        'Sucesso',
        'Tarefa realizada com sucesso.'
      );
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal(): void {
      this.tarefaSelecionada = null;
    },
    editaTarefa(): void {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada).then(() => {
        this.fecharModal();
        this.notificar(
          TipoNotificacao.SUCESSO,
          'Sucesso',
          'Tarefa atualizada com sucesso.'
        );
      });
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    const filtro = ref('');

    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     (task) => !filtro.value || task.descricao.includes(filtro.value)
    //   )
    // );

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      notificar,
      filtro,
    };
  },
});
</script>

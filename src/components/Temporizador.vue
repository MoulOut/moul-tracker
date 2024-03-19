<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempo-em-segundos="tempoEmSegundos" />
    <BotaoTemporizador
      :texto="'Iniciar'"
      :ativo="cronometroAtivo"
      :icone="'fas fa-play'"
      @clicado="iniciarContagem"
    />
    <BotaoTemporizador
      :texto="'Parar'"
      :ativo="!cronometroAtivo"
      :icone="'fas fa-stop'"
      @clicado="finalizarContagem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import BotaoTemporizador from './BotaoTemporizador.vue';

export default defineComponent({
  // eslint-disable-next-line
  name: 'Temporizador',
  components: { Cronometro, BotaoTemporizador },
  emits: ['temporizadorFinalizado'],
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroAtivo: false,
    };
  },
  methods: {
    iniciarContagem() {
      this.cronometroAtivo = true;
      this.cronometro = setInterval(() => this.tempoEmSegundos++, 1000);
    },

    finalizarContagem() {
      this.cronometroAtivo = false;
      clearInterval(this.cronometro);
      this.$emit('temporizadorFinalizado', this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
});
</script>

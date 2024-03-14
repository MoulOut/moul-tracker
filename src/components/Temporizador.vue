<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempo-em-segundos="tempoEmSegundos" />
    <button class="button" @click="iniciarContagem" :disabled="cronometroAtivo">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button
      class="button"
      @click="finalizarContagem"
      :disabled="!cronometroAtivo"
    >
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';

export default defineComponent({
  // eslint-disable-next-line
  name: 'Temporizador',
  components: { Cronometro },
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
    },
  },
});
</script>

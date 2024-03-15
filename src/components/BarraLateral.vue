<template>
  <header>
    <h1>
      <img src="@/assets/logo.png" alt="" />
      <button class="button" @click="alterarModo">{{ textoBotao }}</button>
    </h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BarraLateral',
  emits: ['alteraTema'],
  data() {
    return {
      modoEscuro: false,
    };
  },
  computed: {
    textoBotao() {
      if (this.modoEscuro) {
        return 'Desativar Modo Escuro';
      }
      return 'Ativar Modo Escuro';
    },
  },
  methods: {
    alterarModo(): void {
      this.modoEscuro = !this.modoEscuro;
      this.$emit('alteraTema', this.modoEscuro);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>

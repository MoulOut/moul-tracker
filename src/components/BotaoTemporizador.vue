<template>
  <button class="button" @click="clicado" :disabled="ativo">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span>{{ texto }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BotaoTemporizador',
  emits: ['clicado'],
  props: {
    texto: { type: String, required: true },
    ativo: { type: Boolean },
    icone: { type: String, required: true },
  },
  methods: {
    clicado() {
      this.$emit('clicado');
    },
  },
});
</script>

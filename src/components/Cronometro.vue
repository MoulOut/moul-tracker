<template>
  <section>
    <span class="icon">
      <i class="fas fa-clock"></i>
    </span>
    <strong class="display">
      {{ tempoDecorrido }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Cronometro',
  props: {
    tempoEmSegundos: { type: Number, default: 0 },
  },
  computed: {
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundos * 1000)
        .toISOString()
        .substring(11, 19);
    },
  },
});
</script>

<style scoped>
.display {
  color: var(--texto-primario);
}
</style>

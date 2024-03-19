<template>
  <div class="notificacoes">
    <article class="message is-success">
      <div class="message-header">Atenção</div>
      <div class="message-body">
        Aqui vai um texto de notificação bem legalzin.
      </div>
    </article>
    <article class="message is-warning">
      <div class="message-header">Atenção</div>
      <div class="message-body">
        Aqui vai um texto de notificação bem legalzin.
      </div>
    </article>
    <article class="message is-danger">
      <div class="message-header">Atenção</div>
      <div class="message-body">
        Aqui vai um texto de notificação bem legalzin.
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Notificacoes',
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  widows: 300px;
  padding: 8px;
  z-index: 10;
}
</style>

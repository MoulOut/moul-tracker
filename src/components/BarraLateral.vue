<template>
  <header>
    <h1>
      <img src="@/assets/logos.png" alt="" />
      <button class="button" @click="alterarModo">{{ textoBotao }}</button>
    </h1>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
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
.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>

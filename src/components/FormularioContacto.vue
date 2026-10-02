<template>
  <form @submit.prevent="enviar">
    <h2>Contacto</h2>

    <input v-model="nombre" placeholder="Nombre" />
    <input v-model="correo" placeholder="Correo electrónico" />

    <p v-if="error" style="color: red">{{ error }}</p>

    <button type="submit">Enviar</button>
  </form>

  <p v-if="enviado" style="color: green">¡Gracias, {{ nombre }}! Recibimos tu mensaje.</p>
</template>

<script lang="ts">
export default {
  data() {
    return { nombre: "", correo: "", error: "", enviado: false };
  },
  methods: {
    enviar() {
      this.enviado = false;

      if (!this.nombre.trim()) {
        this.error = "El nombre es obligatorio";
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(this.correo)) {
        this.error = "El correo no es válido";
        return;
      }

      this.error = "";
      this.enviado = true;
    },
  },
};
</script>
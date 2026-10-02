<template>
  <h2>{{ mensaje }}, {{ nombre }}!</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    mensaje: { type: String, default: "Bienvenido" },
    nombre: { type: String, default: "invitado" },
  },
});
</script>
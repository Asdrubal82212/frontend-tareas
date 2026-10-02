<template>
  <h1>Inicio</h1>
  <Saludo nombre="Ana" mensaje="Hola" />
  <FormularioContacto />
</template>

<script lang="ts">
import Saludo from "@/components/Saludo.vue";
import FormularioContacto from "@/components/FormularioContacto.vue";

export default {
  components: { Saludo, FormularioContacto },
};
</script>
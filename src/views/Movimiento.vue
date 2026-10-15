<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const orden = ref("");
const codigo = ref("");
const error = ref("");

async function mover(o: string) {
  try {
    error.value = "";
    const res = await axios.post("http://localhost:5001/api/mover", { orden: o });
    codigo.value = res.data.codigo;
    orden.value = res.data.orden;
  } catch (e) {
    codigo.value = "";
    error.value = "Orden no válida o el servicio Python no está corriendo (puerto 5001).";
  }
}
</script>

<template>
  <h1>Control de movimiento</h1>

  <div>
    <button @click="mover('adelante')">Adelante</button>
    <button @click="mover('atras')">Atrás</button>
    <button @click="mover('izquierda')">Izquierda</button>
    <button @click="mover('derecha')">Derecha</button>
    <button @click="mover('detener')">Detener</button>
  </div>

  <p>
    O escribe una orden:
    <input v-model="orden" placeholder="adelante, atras..." @keyup.enter="mover(orden)" />
    <button @click="mover(orden)">Enviar</button>
  </p>

  <h2 v-if="codigo">Orden: {{ orden }} → Código: {{ codigo }}</h2>
  <p v-if="error" style="color: red">{{ error }}</p>
</template>
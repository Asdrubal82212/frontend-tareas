<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

interface Resultado {
  origen: string | null;
  destino: string;
  orden: string;
  codigo: string;
  mensaje: string;
}

const API = "http://localhost:5001/api";

const texto = ref("");
const resultado = ref<Resultado | null>(null);
const error = ref("");

// posición del muñeco (empieza en el centro)
const pos = ref({ x: 150, y: 150 });
const sinAnimacion = ref(false);

const zonas = [
  { id: "adelante", label: "Adelante", x: 150, y: 40 },
  { id: "atras", label: "Atrás", x: 150, y: 260 },
  { id: "izquierda", label: "Izquierda", x: 40, y: 150 },
  { id: "derecha", label: "Derecha", x: 260, y: 150 },
];

function punto(id: string | null) {
  return zonas.find((z) => z.id === id) ?? null;
}

function color(id: string) {
  if (resultado.value?.destino === id) return "#9be39b";
  if (resultado.value?.origen === id) return "#9cc5ff";
  return "#eeeeee";
}

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function animar(origen: string | null, destino: string) {
  const o = punto(origen);
  const d = punto(destino);

  // 1. coloca al muñeco en el origen sin animación
  if (o) {
    sinAnimacion.value = true;
    pos.value = { x: o.x, y: o.y };
    await esperar(60);
    sinAnimacion.value = false;
  }
  // 2. lo camina hasta el destino
  if (d) {
    pos.value = { x: d.x, y: d.y };
  }
}

async function enviar() {
  try {
    error.value = "";
    const res = await axios.post(`${API}/interpretar`, { texto: texto.value });
    resultado.value = res.data;
    await animar(res.data.origen, res.data.destino);
  } catch (e: any) {
    resultado.value = null;
    error.value =
      e.response?.data?.error ?? "No se pudo conectar con el servicio Python (puerto 5001).";
  }
}
</script>

<template>
  <h1>Control de movimiento</h1>

  <div class="panel">
    <svg viewBox="0 0 300 300" width="300" height="300">
      <defs>
        <marker id="flecha" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#2e7d32" />
        </marker>
      </defs>

      <!-- flecha origen -> destino -->
      <line
        v-if="resultado && punto(resultado.origen) && punto(resultado.destino)"
        :x1="punto(resultado.origen)!.x"
        :y1="punto(resultado.origen)!.y"
        :x2="punto(resultado.destino)!.x"
        :y2="punto(resultado.destino)!.y"
        stroke="#2e7d32"
        stroke-width="3"
        stroke-dasharray="6 4"
        marker-end="url(#flecha)"
      />

      <!-- zonas -->
      <g v-for="z in zonas" :key="z.id">
        <circle :cx="z.x" :cy="z.y" r="30" :fill="color(z.id)" stroke="#555" />
        <text :x="z.x" :y="z.y + 46" text-anchor="middle" font-size="11" fill="#000">
          {{ z.label }}
        </text>
      </g>

      <!-- muñeco (se mueve) -->
      <g
        class="humano"
        :class="{ rapido: sinAnimacion }"
        :style="{ transform: `translate(${pos.x}px, ${pos.y}px)` }"
      >
        <circle cx="0" cy="-26" r="11" fill="#f2c9a0" stroke="#333" />
        <rect x="-10" y="-14" width="20" height="30" rx="7" fill="#4a7bd0" stroke="#333" />
        <line x1="-10" y1="-8" x2="-22" y2="8" stroke="#333" stroke-width="4" stroke-linecap="round" />
        <line x1="10" y1="-8" x2="22" y2="8" stroke="#333" stroke-width="4" stroke-linecap="round" />
        <line x1="-4" y1="16" x2="-5" y2="34" stroke="#333" stroke-width="4" stroke-linecap="round" />
        <line x1="4" y1="16" x2="5" y2="34" stroke="#333" stroke-width="4" stroke-linecap="round" />
      </g>
    </svg>

    <div class="caja">
      <input
        v-model="texto"
        placeholder="Escribe aquí / Type here"
        @keyup.enter="enviar"
      />
      <button @click="enviar">Enviar</button>

      <h2 v-if="resultado">
        {{ resultado.origen ?? "?" }} → {{ resultado.destino }} · Código: {{ resultado.codigo }}
      </h2>
      <p v-if="resultado">{{ resultado.mensaje }}</p>
      <p v-if="error" style="color: red">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;
}
.caja input {
  width: 340px;
  max-width: 100%;
}
.humano {
  transition: transform 1.2s ease-in-out;
}
.humano.rapido {
  transition: none;
}
</style>
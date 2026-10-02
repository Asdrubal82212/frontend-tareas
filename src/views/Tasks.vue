<script setup lang="ts">
import { ref, onMounted } from "vue";
import TaskService, { type Task } from "@/services/TaskService";

const tasks = ref<Task[]>([]);

async function cargar() {
  const res = await TaskService.getAll();
  tasks.value = res.data;
}

async function toggle(t: Task) {
  await TaskService.update(t.id!, { ...t, completed: !t.completed });
  await cargar();
}

async function eliminar(id: number) {
  await TaskService.remove(id);
  await cargar();
}

onMounted(cargar);
</script>

<template>
  <h1>Tareas</h1>
  <p v-if="!tasks.length">No hay tareas todavía.</p>
  <ul>
    <li v-for="t in tasks" :key="t.id">
      <input type="checkbox" :checked="t.completed" @change="toggle(t)" />
      <router-link :to="`/tasks/${t.id}`">{{ t.title }}</router-link>
      <button @click="eliminar(t.id!)">Eliminar</button>
    </li>
  </ul>
</template>
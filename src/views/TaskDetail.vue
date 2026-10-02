<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import TaskService, { type Task } from "@/services/TaskService";

const route = useRoute();
const router = useRouter();
const task = ref<Task | null>(null);

onMounted(async () => {
  const res = await TaskService.get(route.params.id as string);
  task.value = res.data;
});

async function guardar() {
  await TaskService.update(task.value!.id!, task.value!);
  router.push("/tasks");
}

async function eliminar() {
  await TaskService.remove(task.value!.id!);
  router.push("/tasks");
}
</script>

<template>
  <div v-if="task">
    <h1>Editar tarea #{{ task.id }}</h1>
    <input v-model="task.title" />
    <input v-model="task.description" />
    <label><input type="checkbox" v-model="task.completed" /> Completada</label>
    <button @click="guardar">Actualizar</button>
    <button @click="eliminar">Eliminar</button>
  </div>
  <router-link to="/tasks">← Volver</router-link>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import TaskService, { type Task } from "@/services/TaskService";

const router = useRouter();
const task = ref<Task>({ title: "", description: "", completed: false });

async function guardar() {
  await TaskService.create(task.value);
  router.push("/tasks");
}
</script>

<template>
  <h1>Nueva tarea</h1>
  <form @submit.prevent="guardar">
    <input v-model="task.title" placeholder="Título" required />
    <input v-model="task.description" placeholder="Descripción" />
    <button type="submit">Guardar</button>
  </form>
</template>
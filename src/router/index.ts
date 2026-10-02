import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Tasks from "@/views/Tasks.vue";
import TaskDetail from "@/views/TaskDetail.vue";
import AddTask from "@/views/AddTask.vue";

const routes = [
    
  { path: "/add", name: "AddTask", component: AddTask },
  { path: "/", name: "Home", component: Home },
  { path: "/tasks", name: "Tasks", component: Tasks },
  { path: "/tasks/:id", name: "TaskDetail", component: TaskDetail },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
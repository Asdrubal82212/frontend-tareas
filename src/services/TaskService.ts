import axios from "axios";

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}

const http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export default {
  getAll() {
    return http.get<Task[]>("/tasks");
  },
  get(id: number | string) {
    return http.get<Task>(`/tasks/${id}`);
  },
  create(data: Task) {
    return http.post<Task>("/tasks", data);
  },
  update(id: number | string, data: Task) {
    return http.put<Task>(`/tasks/${id}`, data);
  },
  remove(id: number | string) {
    return http.delete(`/tasks/${id}`);
  },
};
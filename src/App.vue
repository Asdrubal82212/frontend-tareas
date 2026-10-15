<template>
  <nav>
    <router-link to="/">Inicio</router-link> |
    <router-link to="/tasks">Tareas</router-link> |
    <router-link to="/add">Agregar</router-link> |
    <router-link to="/movimiento">Movimiento</router-link>
  </nav>

  <hr />

  <router-view />
</template>
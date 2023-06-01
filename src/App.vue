<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="container">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost normal-case text-2xl">Manage Images</RouterLink>
      </div>
      <nav class="flex-none ">
        <ul class="menu menu-horizontal px-1 text-xl">
          <li class="text-xl">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/login">Login</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="container px-6 max-w-full max-h-full">
    <RouterView />
  </main>
</template>

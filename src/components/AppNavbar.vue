<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import Cookies from 'js-cookie'

const store = useUserStore()

const handleLogout = () => {
  Cookies.remove('auth-token')
  store.userId = ''
}
</script>
<template>
  <header class="container">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost normal-case text-2xl">Manage Images</RouterLink>
      </div>
      <nav class="flex-none hidden md:block">
        <ul class="menu menu-horizontal px-1 text-xl">
          <li class="text-xl">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li v-if="store.userId !== ''">
            <RouterLink to="/images">Images</RouterLink>
          </li>
          <li>
            <RouterLink to="/images/compress">Compress</RouterLink>
          </li>
          <li v-if="store.userId !== ''">
            <RouterLink to="/images/upload">Upload</RouterLink>
          </li>
          <li v-if="store.userId !== ''">
            <button @click="handleLogout">Logout</button>
          </li>
          <li v-if="store.userId === ''">
            <RouterLink to="/login">Login</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

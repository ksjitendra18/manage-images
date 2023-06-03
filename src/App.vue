<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { useUserStore } from './stores/user'
import URL from './utils/url'
import { onMounted } from 'vue'
import Cookies from 'js-cookie'

const store = useUserStore()

const fetchAuthStatus = async () => {
  const authToken = Cookies.get('auth-token')
  const res = await fetch(`${URL}/.netlify/functions/status`, {
    method: 'POST',
    body: JSON.stringify({ authToken: authToken })
  })
  const resData = await res.json()

  console.log('auth stats', resData)
}

onMounted(() => {
  fetchAuthStatus()
})

console.log('store', store.userId)
</script>

<template>
  <header class="container">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost normal-case text-2xl">Manage Images</RouterLink>
      </div>
      <nav class="flex-none">
        <ul class="menu menu-horizontal px-1 text-xl">
          <li class="text-xl">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li v-if="store.userId !== ''">
            <RouterLink to="/images">Images</RouterLink>
          </li>
          <li v-if="store.userId !== ''">
            <button to="">Logout</button>
          </li>
          <li v-if="store.userId === ''">
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

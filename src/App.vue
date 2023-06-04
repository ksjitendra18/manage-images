<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Cookies from 'js-cookie'
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'
import URL from './utils/url'
import checkAuth from './utils/checkAuth'

const store = useUserStore()

const fetchAuthStatus = async () => {
  // const authToken = Cookies.get('auth-token')
  // const res = await fetch(`${URL}/.netlify/functions/status`, {
  //   method: 'POST',
  //   body: JSON.stringify({ authToken: authToken })
  // })
  // const resData = await res.json()
  const resData = await checkAuth()

  if (resData.data.userId === null) return
  store.setUser(resData.data.userId)
}

onMounted(() => {
  fetchAuthStatus()
})

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
      <nav class="flex-none">
        <ul class="menu menu-horizontal px-1 text-xl">
          <li class="text-xl">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li v-if="store.userId !== ''">
            <RouterLink to="/images">Images</RouterLink>
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

  <main class="container px-6 max-w-full max-h-full">
    <RouterView />
  </main>
</template>

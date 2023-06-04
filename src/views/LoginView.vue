<script setup lang="ts">
import { ref } from 'vue'
import Cookies from 'js-cookie'
import URL from '@/utils/url'

const emailInput = ref('')
const passwordInput = ref('')

import { useUserStore } from '@/stores/user'
import router from '@/router'
const store = useUserStore()

const isError = ref(false)
const isServerError = ref(false)
const isLoading = ref(false)

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  isLoading.value = true
  isError.value = false
  isServerError.value = false
  try {
    const res = await fetch(`${URL}/.netlify/functions/login`, {
      method: 'POST',
      body: JSON.stringify({ email: emailInput.value, password: passwordInput.value })
    })

    const resData = await res.json()

    const token = resData.data.authToken
    store.setUser(resData.data.userId)

    Cookies.set('auth-token', token!, {
      expires: 2,
      sameSite: 'lax'
    })

    router.push('/images')
  } catch (error) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="flex items-center justify-center mt-10">
    <div class="w-full flex items-center justify-center flex-col">
      <h2 class="text-3xl font-medium text-center mb-10">Login</h2>
      <form class="form-control gap-3 md:w-[400px]" @submit="handleSubmit">
        <div>
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input
            v-model="emailInput"
            name="email"
            id="email"
            type="text"
            placeholder="name@email.com"
            :class="{
              'border-red-600 focus-visible:outline-red-600 focus-visible:border-none': isError
            }"
            class="bg-transparent input input-bordered w-full max-w-md"
            required
          />
        </div>
        <div>
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input
            v-model="passwordInput"
            name="password"
            id="password"
            type="password"
            placeholder="6+ characters"
            :class="{
              'border-red-600 focus-visible:outline-red-600 focus-visible:border-none': isError
            }"
            class="input input-bordered w-full max-w-md"
            required
          />
        </div>

        <div v-show="isError" class="bg-red-600 text-white px-3 py-1 rounded-md">
          Please check email and password
        </div>

        <button class="mt-5 btn btn-primary rounded-full">
          <span v-if="isLoading" class="loading loading-spinner"></span>
          Login
        </button>

        <p class="text-center">
          Don't have an account? <RouterLink to="/signup" class="underline">Signup</RouterLink>
        </p>
      </form>
    </div>
  </section>
</template>

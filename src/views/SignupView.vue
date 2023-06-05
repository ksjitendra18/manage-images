<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores/user'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import URL from "@/utils/url"
const store = useUserStore()
const nameInput = ref('')
const emailInput = ref('')
const passwordInput = ref('')

const isLoading = ref(false)
const isError = ref(false)
// const isServerError = ref(false)

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  isLoading.value = true

  try {
    const res = await fetch(`${URL}/.netlify/functions/signup`, {
      method: 'POST',
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      })
    })

    const resData = await res.json()

    if (res.status === 400 || resData.success === false) {
      isError.value = true
      return
    }

    const token = resData.data.authToken
    store.setUser(resData.data.userId)

    Cookies.set('auth-token', token!, {
      expires: 2,
      sameSite: 'lax'
    })

    router.push('/images')
  } catch (error) {
    isError.value = true
    console.log('error while signup', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="flex items-center justify-center mt-10">
    <div class="w-full flex items-center justify-center flex-col">
      <h2 class="text-3xl font-medium text-center mb-10">Signup</h2>
      <form class="form-control gap-3 md:w-[400px]" @submit="handleSubmit">
        <div>
          <label class="label" for="name">
            <span class="label-text">Name</span>
          </label>
          <input
            v-model="nameInput"
            name="name"
            id="name"
            type="text"
            placeholder="Your Name"
            class="input input-bordered w-full max-w-md"
          />
        </div>
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
            class="input input-bordered w-full max-w-md"
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
            :class="{
              'border-red-600 focus-visible:outline-red-600 focus-visible:border-none': isError
            }"
            placeholder="6+ characters"
            class="input input-bordered w-full max-w-md"
          />
        </div>

        <div v-show="isError" class="bg-red-600 text-white px-3 py-1 rounded-md">
          Please check email and password
        </div>

        <button class="mt-5 btn btn-primary rounded-full">
          <span v-if="isLoading" class="loading loading-spinner"></span>

          Signup
        </button>

        <p class="text-center">
          Already have an account? <RouterLink to="/login" class="underline">Login</RouterLink>
        </p>
      </form>
    </div>
  </section>
</template>

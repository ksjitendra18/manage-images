<script setup lang="ts">
import router from '@/router'
import URL from '@/utils/url'

import Cookies from 'js-cookie'
import { ref } from 'vue'

const apiKey = ref('')
const folderName = ref('')
const storageName = ref('')

const isError = ref(false)

const isLoading = ref(false)

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  isLoading.value = true

  try {
    const res = await fetch(`${URL}/.netlify/functions/addEndpoint`, {
      method: 'POST',
      body: JSON.stringify({
        apiKey: apiKey.value,
        folderName: folderName.value,
        storageName: storageName.value,
        authToken: Cookies.get('auth-token')
      })
    })

    const resData = await res.json()

    router.push(`/images/${resData.data.endpointId}/${folderName.value}`)
  } catch (error) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <section class="flex flex-col mt-20 justify-center items-center">
    <h2 class="text-3xl font-semobold">Add an endpoint</h2>
    <p>Watch Tutorial on how to configure.</p>

    <form class="mt-5 form-control gap-3 md:w-[400px]" @submit="handleSubmit">
      <div>
        <label class="label" for="apiKey">
          <span class="label-text">API Key </span>
        </label>
        <input
          v-model="apiKey"
          name="apiKey"
          id="apiKey"
          type="text"
          placeholder="apikey or password"
          :class="{
            'border-red-600 focus-visible:outline-red-600 focus-visible:border-none': isError
          }"
          class="bg-transparent input input-bordered w-full max-w-md"
          required
        />
      </div>
      <div>
        <label class="label" for="storageName">
          <span class="label-text">Storage Name</span>
        </label>
        <input
          v-model="storageName"
          name="storageName"
          id="storageName"
          type="folder"
          placeholder="storage name or username"
          :class="{
            'border-red-600 focus-visible:outline-red-600 focus-visible:border-none': isError
          }"
          class="input input-bordered w-full max-w-md"
          required
        />
      </div>
      <div>
        <label class="label" for="folderName">
          <span class="label-text">Folder Name</span>
        </label>
        <input
          v-model="folderName"
          name="folderName"
          id="folderName"
          type="folder"
          placeholder="folder name"
          :class="{
            'border-red-600 focus-visible:outline-red-600 focus-visible:border-none': isError
          }"
          class="input input-bordered w-full max-w-md"
          required
        />
      </div>

      <div v-show="isError" class="bg-red-600 text-white px-3 py-1 rounded-md">
        Please check fields
      </div>

      <button class="mt-5 btn btn-primary rounded-full">
        <span v-if="isLoading" class="loading loading-spinner"></span>
        Add Endpoint
      </button>
    </form>
  </section>
</template>

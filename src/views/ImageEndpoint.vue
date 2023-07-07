<script setup lang="ts">
import URL from '@/utils/url'
import Cookies from 'js-cookie'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { type Photo } from '@/types/Photo'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
const route = useRoute()

const endPointId = route.params.endpointId
const authToken = Cookies.get('auth-token')

const photos: Ref<Photo[]> = ref([])
const isFetching = ref(true)
const showCopyToast = ref(false)
const toastMessage = ref('')

function showToast() {
  showCopyToast.value = true
  toastMessage.value = 'Link Copied Successfully'
  setTimeout(() => {
    showCopyToast.value = false
  }, 3000)
}
const fetchImages = async () => {
  isFetching.value = true
  const res = await fetch(`${URL}/.netlify/functions/fetchImages`, {
    method: 'post',
    body: JSON.stringify({ endPointId: endPointId, authToken: authToken })
  })

  const resData = await res.json()
  photos.value = resData.data.photos
  isFetching.value = false
}

onMounted(() => fetchImages())

function imageSrc(photo: Photo) {
  return `https://${photo.StorageZoneName}.b-cdn.net/${photo.Path.split('/')[2]}/${
    photo.ObjectName
  }`
}

async function copyToClipboard(photo: Photo) {
  const imgLink = imageSrc(photo)
  try {
    await navigator.clipboard.writeText(imgLink)
    showToast()
  } catch (err) {
    console.error(`Error while copying link`)
  }
}

async function deleteImage(fileName: string) {
  const res = await fetch(`${URL}/.netlify/functions/deleteImage`, {
    method: 'POST',
    body: JSON.stringify({ authToken, endPointId, fileName })
  })

  const resData = await res.json()
  fetchImages()
  console.log(resData, 'resData')
}
</script>

<template>
  <!-- <div v-else> -->

  <h2 class="text-3xl mt-3 font-semibold">
    Images for {{ $route.params.folderName }} folder of
    {{ $route.params.storageName }}
  </h2>

  <div v-if="isFetching" class="flex mt-5 flex-wrap gap-7">
    <LoadingSkeleton />
    <LoadingSkeleton />
    <LoadingSkeleton />
  </div>

  <div v-else class="flex flex-wrap gap-7 gap-y-9 mt-5 mb-10">
    <div
      v-for="photo in photos"
      :key="photo.ObjectName"
      class="border-2 border-slate-500 px-2 py-2 rounded-xl"
    >
      <img class="rounded-t-xl" height="400" width="400" :src="imageSrc(photo)" />

      <p class="my-1">{{ photo.ObjectName }}</p>
      <p>{{ (photo.Length / 1024).toFixed(2) }} kb</p>

      <div class="flex justify-between mt-3 text-sm">
        <button
          @click="deleteImage(photo.ObjectName)"
          class="text-sm text-red-600 cursor-pointer deletebtn"
        >
          Delete
        </button>
        <button @click="copyToClipboard(photo)" class="cursor-pointer copylink">Copy Link</button>
      </div>
    </div>
  </div>

  <div v-if="showCopyToast" class="toast">
    <div class="alert alert-info">
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

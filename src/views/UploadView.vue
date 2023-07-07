<template>
  <section class="w-full h-full flex items-center justify-center mt-10">
    <div
      class="flex justify-center flex-col items-center py-5 w-[600px] border-2 border-dotted border-slate-400 rounded-xl"
    >
      <div class="flex flex-col w-full h-full justify-center items-center" v-if="hasAddedImage">
        <img height="300" width="300" class="rounded-xl" :src="uploadingImageSrc" />

        <div class="mt-5">
          <form @submit="handleUpload" enctype="multipart/form-data" class="form-control">
            <div class="actions mt-2 gap-5 flex justify-between">
              <button type="submit" class="btn btn-info rounded-full">Upload</button>
              <button type="button" @click="handleCancel" class="btn btn-error rounded-full">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <form v-else>
        <input
          @change="handleImageChange"
          name="uploadImage"
          type="file"
          accept="image/*"
          class="file-input file-input-bordered file-input-info w-full max-w-xs"
        />
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import URL from '@/utils/url'
import { ref } from 'vue'

const hasAddedImage = ref(false)
const compressImageOption = ref(true)
const uploadingImageSrc = ref('')

const fileRef = ref<File | null>(null)

function handleImageChange(event: Event) {
  hasAddedImage.value = true

  const inputElement = event.target as HTMLInputElement
  if (!inputElement.files) return
  const file = inputElement.files[0]
  fileRef.value = file
  const reader = new FileReader()

  reader.onload = function (e) {
    uploadingImageSrc.value = e.target!.result as string
  }

  reader.readAsDataURL(file)
}

function handleCompressOption() {
  compressImageOption.value = !compressImageOption.value
}

function handleCancel() {
  hasAddedImage.value = false
  uploadingImageSrc.value = ''
}

async function handleUpload(event: Event) {
  event.preventDefault()
  console.log('hit')
  const inputElement = event.target as HTMLInputElement
  console.log('hit 2')
  try {
    console.log('hit 3')
    // if (!inputElement.files) return

    console.log('hit 4')
    // const file = inputElement.files[0]

    console.log('hit 5')

    const formData = new FormData()
    formData.append('image', fileRef.value)

    const response = await fetch(`${URL}/.netlify/functions/compress`, {
      method: 'POST',
      body: formData
    })

    const resData = await response.json()

    console.log('resData is', resData)
  } catch (error) {
    console.log('error while uploding', error)
  }

  console.log('end')
}
</script>

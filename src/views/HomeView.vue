<script setup lang="ts">
import HomeFeatures from '@/components/Home/HomeFeatures.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const store = useUserStore()
const pagePath = ref('')
const isAuth = ref()
isAuth.value = store.userId !== ''

pagePath.value = isAuth.value ? '/images' : '/login'
</script>

<template>
  <section class="h-[500px] flex-col flex items-center justify-center">
    <h2 class="font-medium text-center text-4xl">Manage your images in CDN</h2>
    <p class="mt-3 text-center">Upload, Compress, Organize your images</p>
    <div class="cta">
      <!-- <button class="btn btn-primary rounded-full my-5 mt-7 px-7 text-sm"> -->
      <RouterLink :to="pagePath" class="btn btn-primary rounded-full my-5 mt-7 px-7 text-sm">
        Start Managing Images
      </RouterLink>
      <!-- </button> -->
    </div>
  </section>
</template>

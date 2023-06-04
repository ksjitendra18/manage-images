<script setup lang="ts">
import URL from '@/utils/url'
import Cookies from 'js-cookie'
import { Plus } from 'lucide-vue-next'
import { onMounted, ref, type Ref } from 'vue'

interface Endpoint {
  id: number
  endpointId: string
  provider: string
  apiKey: string
  userId: string
  folderName: string
  storageName: string
}
const noEndpoints = ref(false)
const endPoints: Ref<Endpoint[]> = ref([])
const fetchEndPoints = async () => {
  const res = await fetch(`${URL}/.netlify/functions/endpoints`, {
    method: 'POST',
    body: JSON.stringify({ authToken: Cookies.get('auth-token') })
  })
  const resData = await res.json()

  if (resData.data.endPoints.length < 1) {
    noEndpoints.value = true
  }
  endPoints.value = resData.data.endPoints
}

function constructUrl(endPoint: Endpoint) {
  const url = `/images/${endPoint.endpointId}/${endPoint.storageName}/${endPoint.folderName}`
  return url
}

onMounted(() => {
  fetchEndPoints()
})
</script>

<template>
  <section class="h-[500px]">
    <div
      v-if="noEndpoints"
      class="rounded-xl mt-20 h-[300px] flex items-center justify-center flex-col"
    >
      <h3 class="text-3xl font-medium my-10">You don't have any endpoint. Add One</h3>
      <RouterLink
        to="/images/add-endpoint"
        class="flex items-center justify-center border-2 border-dashed px-16 py-10 cursor-pointer"
      >
        <Plus class="inline text-sm mr-1" />Add an endpoint
      </RouterLink>
    </div>

    <div v-else class="flex flex-col gap-3">
      <h3 class="text-3xl font-medium my-10">All Endpoints</h3>

      <div v-for="endPoint in endPoints" :key="endPoint.endpointId" class="flex">
        <RouterLink
          title="OP"
          :to="constructUrl(endPoint)"
          class="card border-2 px-16 py-10 cursor-pointer"
          >/{{ endPoint.folderName }}</RouterLink
        >
      </div>
      <!-- 
      <RouterLink
        to="/images/add-endpoint"
        class="flex items-center justify-center border-2 border-dashed px-16 py-10 cursor-pointer"
      >
        <Plus class="inline text-sm mr-1" />Add an endpoint
      </RouterLink> -->
    </div>
  </section>
</template>

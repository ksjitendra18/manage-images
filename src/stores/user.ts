import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userId = ref('')

  function setUser(uid: string) {
    userId.value = uid
  }

  function removeUser() {
    userId.value = ''
  }

  return { userId, setUser, removeUser }
})

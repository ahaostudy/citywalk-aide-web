import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useHomeStore = defineStore('home', () => {
  const searchCfg = reactive({
    keyword: '',
    city: '深圳',
    page: 1,
    pageSize: 16,
    total: 0,
    loading: false
  })

  return { searchCfg }
})

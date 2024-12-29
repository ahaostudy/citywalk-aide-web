import axios from 'axios'
import '@arco-design/web-vue/es/message/style/css.js'
import { Message } from '@arco-design/web-vue'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      Message.error('[ERROR] Request error')
      return Promise.reject(response.data)
    }

    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance

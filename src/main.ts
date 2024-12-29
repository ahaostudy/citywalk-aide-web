import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import router from './router'
import '@arco-design/web-vue/dist/arco.css'
import { createPinia } from 'pinia'


const app = createApp(App)
app.use(ArcoVue)
app.use(router)
app.use(createPinia())
app.mount('#app')
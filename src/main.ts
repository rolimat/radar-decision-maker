import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app
  .use(ElementPlus)
  .use(i18n)
  .use(router)
  .mount('#app')

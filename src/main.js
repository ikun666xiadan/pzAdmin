import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./style.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//路由挂载
app.use(router)
app.use(store)
app.mount('#app')

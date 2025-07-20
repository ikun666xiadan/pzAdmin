import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./style.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用 Element Plus
app.use(ElementPlus)

//路由挂载
app.use(router)
app.use(store)
app.mount('#app')

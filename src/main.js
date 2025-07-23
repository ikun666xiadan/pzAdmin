import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./style.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
import panelHeader from './components/panel-header.vue'


// 添加路由守卫（前置路由守卫）
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  // token不存在，且在非登录页面时，跳转到登录界面
  if (!token && to.path !== '/login') {
    return '/login'
  } else if (token && to.path === '/login') { // token存在时不允许在访问登录界面
    return '/'
  } else {
    return true
  }
})

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局注入panelHeader组件
app.component('panelHeader',panelHeader)

// 使用 Element Plus
app.use(ElementPlus)

//路由挂载
app.use(router)
app.use(store)
app.mount('#app')

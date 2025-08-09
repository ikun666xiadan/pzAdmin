import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./style.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
import panelHeader from './components/panel-header.vue'

// 刷新后的动态路由添加
const localData = localStorage.getItem('pz_persistedState')
if(localData){
  // 调用dynamicMenu方法
  store.commit('dynamicMenu',JSON.parse(localData).menu.routerList)
  store.state.menu.routerList.forEach(item =>{
    router.addRoute('main',item)
  })
  // 根据当前路径设置激活菜单项
  const currentPath = window.location.hash.replace('#', '')
  if (currentPath && currentPath !== '/login' && currentPath !== '/') {
    store.commit('setActiveMenuByPath', currentPath)
  }
}

// 添加路由守卫（前置路由守卫）
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  // token不存在，且在非登录页面时，跳转到登录界面
  if (!token && to.path !== '/login') {
    return '/login'
  } else if (token && to.path === '/login') { // token存在时不允许在访问登录界面
    return '/'
  } else {
    // 根据当前路由路径设置激活菜单项
    if (to.path !== '/login' && to.path !== '/') {
      store.commit('setActiveMenuByPath', to.path)
    }
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

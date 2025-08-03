import { createRouter,createWebHashHistory } from "vue-router"

import Layout from "../views/Layout.vue"
import Login from "../views/login/index.vue"


const routes = [
  { 
    path: '/',
    component: Layout,
    name: 'main',
    // 路由重定向
    redirect:to =>{
      const routerList = localStorage.getItem('pz_persistedState')
      if(routerList){
        // 有子菜单
        const child = JSON.parse(routerList).menu.routerList[0].children
        if(child){
          return child[0].meta.path
        }else{
          return JSON.parse(routerList).menu.routerList[0].meta.path
        }
      }else{
        return '/login'
      }
    },
    children: []
  },
  {
    path: '/login',
    component: Login
  },
]

const router = createRouter({
    //路由数据
    routes,
    //路由匹配模式
    history:createWebHashHistory()
})

export default router
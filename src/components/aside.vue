<template>
  <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        text-color="#fff"
        :default-active="activeMenu"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :style="{width:isCollapse ? '64px' : '200px'}"
      >
        <p class="title">{{isCollapse ? 'DIDI' : 'DIDI陪诊'}}</p>
        <TreeMenu :menuData="menuData" :index="1" />
      </el-menu>
    </el-col>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TreeMenu from './treeMenu.vue';
import { useStore } from "vuex";
const store = useStore()
const isCollapse = computed(()=>store.state.menu.isCollapse)

const router = useRouter()
const route = useRoute()
const menuData = ref(router.options.routes[0].children)

// 计算当前激活的菜单项
const activeMenu = computed(() => {
  const currentPath = route.path
  
  // 递归查找激活的菜单项
  const findActiveMenu = (menus, parentIndex = '1') => {
    for (const menu of menus) {
      // 检查当前菜单项是否匹配
      if (menu.meta && menu.meta.path === currentPath) {
        return `${parentIndex}-${menu.meta.id}`
      }
      
      // 检查子菜单
      if (menu.children) {
        const found = findActiveMenu(menu.children, `${parentIndex}-${menu.meta.id}`)
        if (found) return found
      }
    }
    return ''
  }
  
  return findActiveMenu(menuData.value)
})

const handleOpen = ()=>{}
const handleClose = ()=>{}
</script>

<style lang="less" scoped>
.aside-container{
  height: 100%;
  .title{
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="aside-container"
    text-color="#fff"
    :default-active="defaultActiveMenu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <p class="title">{{isCollapse ? 'DIDI' : 'DIDI陪诊'}}</p>
    <TreeMenu :menuData="menuData" :index="1" />
  </el-menu>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import TreeMenu from './treeMenu.vue';
import { useStore } from "vuex";

const store = useStore()
const route = useRoute()
const isCollapse = computed(()=>store.state.menu.isCollapse)
const menuData = computed(()=>store.state.menu.routerList)
const defaultActiveMenu = computed(()=>store.state.menu.initActiveMenu)

// 监听路由变化，更新激活菜单项
watch(() => route.path, (newPath) => {
  if (newPath !== '/login' && newPath !== '/') {
    store.commit('setActiveMenuByPath', newPath)
  }
}, { immediate: true })

const handleOpen = ()=>{}
const handleClose = ()=>{}
</script>

<style lang="less" scoped>
.aside-container{
  height: 100%;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: all;
  /* 确保初始状态稳定 */
  backface-visibility: hidden;
  transform: translateZ(0);
  .title{
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    /* 确保文字动画稳定 */
    backface-visibility: hidden;
    transform: translateZ(0);
  }
}
</style>
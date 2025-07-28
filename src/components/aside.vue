<template>
  <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        text-color="#fff"
        :default-active="defaultActiveMenu"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :style="{width:isCollapse ? '64px' : '200px'}"
      >
        <p class="title">{{isCollapse ? '阳光' : '阳光陪诊'}}</p>
        <TreeMenu :menuData="menuData" :index="1" />
      </el-menu>
    </el-col>
</template>

<script setup>
import { computed } from 'vue';
import TreeMenu from './treeMenu.vue';
import { useStore } from "vuex";

const store = useStore()
const isCollapse = computed(()=>store.state.menu.isCollapse)
const menuData = computed(()=>store.state.menu.routerList)
const defaultActiveMenu = computed(()=>store.state.menu.initActiveMenu)


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
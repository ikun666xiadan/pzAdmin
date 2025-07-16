<template>
  <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <p class="title">DIDI陪诊</p>
        <TreeMenu :menuData="menuData" :index="1" />
      </el-menu>
    </el-col>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TreeMenu from './treeMenu.vue';

const router = useRouter()
const menuData = ref(router.options.routes[0].children)

const handleOpen = ()=>{}
const handleClose = ()=>{}
</script>

<style lang="less" scoped>
.aside-container{
  height: 100%;
  width: 200px;
  .title{
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
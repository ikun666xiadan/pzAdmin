<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" height="100%">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import Aside from "../components/aside.vue";
import Header from "../components/header.vue";

const store = useStore()
const isCollapse = computed(()=>store.state.menu.isCollapse)
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
    .el-col-12 {
      flex: 0;
      height: 100%;
    }
  }
}
</style>

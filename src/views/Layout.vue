<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" height="100%" class="aside-transition">
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
  .aside-transition {
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: width;
    /* 确保初始状态稳定 */
    backface-visibility: hidden;
    transform: translateZ(0);
    /* 防止闪烁 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>

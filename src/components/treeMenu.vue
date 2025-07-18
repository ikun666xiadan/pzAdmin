<template>
  <template v-for="item in props.menuData" :key="`${props.index}-${item.meta.id}`">
    <el-menu-item
      v-if="!item.children || item.children.length == 0"
      :index="`${props.index}-${item.meta.id}`"
      :key="`menu-item-${props.index}-${item.meta.id}`"
      @click="handelRouter(item,`${props.index}-${item.meta.id}`)"
    >
      <el-icon size="20">
        <!-- 动态组件写法 -->
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.name }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`" :key="`sub-menu-${props.index}-${item.meta.id}`">
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <!-- 递归组件 -->
      <tree-menu
        :menuData="item.children"
        :index="`${props.index}-${item.meta.id}`"
        :key="`recursive-${props.index}-${item.meta.id}`"
      />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const props = defineProps(["menuData", "index"]);

// 创建router实例
const router = useRouter()
const route = useRoute()

const handelRouter = (item,activeId)=>{
  // 路由跳转
  router.push(item.meta.path)
}
</script>

<template>
  <template v-for="item in props.menuData">
    <el-menu-item
      v-if="!item.children || item.children.length == 0"
      :index="`${props.id}-${item.meta.id}`"
      :key="`${props.id}-${item.meta.id}`"
    >
      <el-icon size="20">
        <!-- 展示组件写法 -->
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.name }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="`${props.id}-${item.meta.id}`">
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <!-- 递归组件 -->
      <tree-menu
        :menuData="item.children"
        :index="`${props.id}-${item.meta.id}`"
      />
    </el-sub-menu>
  </template>
</template>

<script setup>
const props = defineProps(["menuData", "index"]);
</script>

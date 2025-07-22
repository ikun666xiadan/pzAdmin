<template>
  <div>
    <el-button plain @click="dialogFormVisible = true">新增</el-button>
    <el-dialog v-model="dialogFormVisible" title="权限管理" width="500">
      <el-form :model="form" style="max-width: 600px" ref="formRef">
        <el-form-item label="id" v-show="false">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请修改权限名称" />
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-tree
            style="max-width: 600px"
            ref="treeRef"
            :data="data"
            show-checkbox
            node-key="id"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 400px;" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const dialogFormVisible = ref(false);
const formRef = ref()
const treeRef = ref()
const form = ref({
  id: '',
  name: '',
  permissions: '',
});
const data = [
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
];

const submit = ()=>{
    console.log(form.value);
    
}
</script>

<style lang="less" scoped>
</style>

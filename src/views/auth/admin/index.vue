<template>
  <el-table style="width: 100%">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="groupBy" label="所属组别"/>
    <el-table-column prop="phone" label="手机号" />
    <el-table-column prop="status" label="状态" />
    <el-table-column prop="createdTime" label="创建时间" />
    <el-table-column label="操作">
      <template #default="">
        <el-button type="primary">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <div class="pagination-info">
    <el-pagination
      v-model:current-page="paginationData.pageNum"
      :page-size="paginationData.pageSize"
    />
  </div> -->
  <el-dialog v-model="dialogFormVisible" title="编辑用户" width="500">
    <el-form :model="form" style="max-width: 600px" ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="菜单权限" prop="permissions"></el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 400px">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";

const dialogFormVisible = ref(false);
const formRef = ref();
const paginationData = reactive({ pageNum: 1, pageSize: 10 });
const form = reactive({
  phone: "",
  name: "",
  permissions: "",
});
</script>

<style lang="less" scoped>
</style>

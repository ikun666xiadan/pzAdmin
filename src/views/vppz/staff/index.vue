<template>
  <panelHeader :data="route"/>
  <el-button type="primary" @click="open(null)" style="margin-bottom: 10px"
    >新增</el-button
  >
  <el-table style="width: 100%" :data="listData.list">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="permissionName" label="菜单权限" width="500px" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="open(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-info">
    <el-pagination
      v-model:current-page="paginationData.pageNum"
      :page-size="paginationData.pageSize"
      :total="listData.total"
      layout="total, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="权限管理"
    width="500"
    :before-close="beforeClose"
  >
    <el-form
      :model="form"
      style="max-width: 600px"
      ref="formRef"
      :rules="rules"
    >
      <el-form-item label="id" v-show="false" prop="id">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请修改权限名称" />
      </el-form-item>
      <el-form-item label="权限" prop="permissions">
        <el-tree
          style="max-width: 600px"
          ref="treeRef"
          :data="menuData"
          show-checkbox
          node-key="id"
          :default-checked-keys="defaultCheckedKeys"
          :default-expanded-keys="[2]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="margin-left: 400px"
          @click="submit(formRef)"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import { getMenuAPI, getMenuListAPI, setMenuAPI } from "../../../api/menu";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";

const route = useRoute()
const dialogFormVisible = ref(false);
const formRef = ref();
const treeRef = ref();
const form = reactive({
  id: "",
  name: "",
  permissions: "",
});
const defaultCheckedKeys = [4, 5];
const menuData = ref([]);
const listData = ref({
  list: [],
  total: 0,
});
const rules = ref({
  name: [{ required: true, trigger: "blur", message: "请输入权限名称" }],
});
const paginationData = reactive({ pageNum: 1, pageSize: 10 });

onMounted(async () => {
  const res = await getMenuAPI();
  menuData.value = res.data;
  getMenuList();
});

// 编辑按钮，处理打开弹窗的逻辑
const open = (rowData = {}) => {
  dialogFormVisible.value = true;
  // 弹窗打开form是异步的
  nextTick(() => {
    if (rowData) {
      // 数据回显
      Object.assign(form, { id: rowData.id, name: rowData.name });
      // tree回显
      treeRef.value.setCheckedKeys(rowData.permission);
    }
  });
};

// 关闭弹窗回调
const beforeClose = () => {
  dialogFormVisible.value = false;
  formRef.value.resetFields();
  treeRef.value.setCheckedKeys(defaultCheckedKeys);
};

// 获取列表
const getMenuList = async () => {
  const res = await getMenuListAPI(paginationData);
  listData.value = res.data;
};

// 提交按钮
const submit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // 获取到选择的checkbox数据
      const permissions = JSON.stringify(treeRef.value.getCheckedKeys());
      await setMenuAPI({
        name: form.name,
        permissions,
        id: form.id,
      });
      if (form.id) {
        ElMessage.success("编辑成功");
      } else {
        ElMessage.success("新增成功");
      }
      beforeClose();
      getMenuList();
    } else {
      console.log("error submit", fields);
    }
  });
};

// 处理分页
const handleSizeChange = (value) => {
  paginationData.pageSize = value;
  getMenuList();
};
const handleCurrentChange = (value) => {
  paginationData.pageNum = value;
  getMenuList();
};
</script>

<style lang="less" scoped>
</style>

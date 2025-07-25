<template>
  <panelHeader/>
  <el-table style="width: 100%" :data="authData.list">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="permissions_id" label="所属组别">
      <template #default="scope">
        <span>{{ permissionName(scope.row.permissions_id) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="mobile" label="手机号" />
    <el-table-column prop="active" label="状态">
      <template #default="scope">
        <el-tag :type="scope.row.active ? 'success' : 'danger'">{{
          scope.row.active ? "正常" : "异常"
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="create_time" label="创建时间">
      <template #default="scope">
        <span>{{ handelTime(scope.row.create_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-info">
    <el-pagination
      :current-page="paginationData.pageNum"
      :page-size="paginationData.pageSize"
      :total="authData.total"
      layout="total, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="编辑用户"
    width="500"
    :before-close="beforeClose"
  >
    <el-form
      :model="form"
      :rules="rules"
      style="max-width: 600px"
      ref="formRef"
      label-width="auto"
    >
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" disabled />
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="菜单权限" prop="permissions_id">
        <el-select
          v-model="form.permissions_id"
          placeholder="请选择菜单权限"
          style="width: 240px"
        >
          <el-option
            v-for="item in selectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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
import { onMounted, reactive, ref } from "vue";
import {
  getAuthDataAPI,
  getSelectListAPI,
  updateUserInfo,
} from "../../../api/auth";
import handelTime from "../../../utils/handelTime";
import { ElMessage } from "element-plus";

const dialogFormVisible = ref(false);
const formRef = ref();
const paginationData = reactive({ pageNum: 1, pageSize: 10 });
const form = reactive({
  name: "",
  permissions_id: "",
});
const authData = ref({ list: [], total: 0 });
const selectList = ref([]);
const rules = ref({
  name: [{ required: true, trigger: "blur", message: "请输填写昵称" }],
  permissions_id: [
    { required: true, trigger: "blur", message: "请选择菜单权限" },
  ],
});

onMounted(async () => {
  const res = await getSelectListAPI();
  selectList.value = res.data;
  getAuthList();
});

// 获取账号列表
const getAuthList = async () => {
  const res = await getAuthDataAPI(paginationData);
  authData.value = res.data;
};

// 编辑功能
const edit = (rowData) => {
  dialogFormVisible.value = true;
  Object.assign(form, {
    mobile: rowData.mobile,
    name: rowData.name,
    permissions_id: rowData.permissions_id,
  });
};

const submit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await updateUserInfo({
        name: form.name,
        permissions_id: form.permissions_id,
      });
      dialogFormVisible.value = false;
      getAuthList();
      ElMessage.success("修改成功");
    } else {
      console.log("error submit", fields);
    }
  });
};

// 关闭弹窗回调
const beforeClose = () => {
  dialogFormVisible.value = false;
  formRef.value.resetFields();
};

// 根据id匹配所属组别
const permissionName = (id) => {
  const data = selectList.value.find((item) => item.id === id);
  return data ? data.name : "超级管理员";
};

// 处理分页-
const handleSizeChange = (value) => {
  paginationData.pageSize = value;
  getAuthList();
};
const handleCurrentChange = (value) => {
  paginationData.pageNum = value;
  getAuthList();
};
</script>

<style lang="less" scoped></style>

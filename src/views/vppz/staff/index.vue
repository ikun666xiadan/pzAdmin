<template>
  <panelHeader :data="route" />
  <el-button type="primary" @click="open(null)" style="margin-bottom: 10px"
    >新增</el-button
  >
  <el-table style="width: 100%" :data="listData.list">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="avatar" label="头像" />
    <el-table-column prop="sex" label="性别" />
    <el-table-column prop="mobile" label="手机号" />
    <el-table-column prop="active" label="状态" />
    <el-table-column prop="create_time" label="创建时间" />
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
    title="陪护管理"
    width="500"
    :before-close="beforeClose"
  >
    <el-form
      :model="form"
      style="max-width: 600px"
      ref="formRef"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="id" v-show="false" prop="id">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar"> 
        <el-upload
          class="avatar-uploader"
          action="http://localhost:5173"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio value="0">女</el-radio>
          <el-radio value="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age"> 
        <el-input-number v-model="form.age" :min="18" :max="100" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="是否生效" prop="active">
        <el-radio-group v-model="form.active">
          <el-radio value="0">失效</el-radio>
          <el-radio value="1">生效</el-radio>
        </el-radio-group>
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
import { getMenuAPI, setMenuAPI } from "../../../api/menu";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { getNurseListAPI } from "../../../api/nurse";

const route = useRoute();
const dialogFormVisible = ref(false);
const formRef = ref();
const treeRef = ref();
const imageUrl = ref('')
const form = reactive({
  id: "",
  name: "",
  age: 0,
  avatar: "",
  sex: "",
  mobile: "",
  active: 1,
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
  getNurseList();
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
const getNurseList = async () => {
  const res = await getNurseListAPI(paginationData);
  console.log(res);
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
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>

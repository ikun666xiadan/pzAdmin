<template>
  <panelHeader :data="route" />
  <el-button type="primary" @click="open(null)" style="margin-bottom: 10px"
    >新增</el-button
  >
  <el-table style="width: 100%" :data="listData.list">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="avatar" label="头像">
      <template #default="scope">
        <el-image style="width: 80px; height: 80px" :src="scope.row.avatar" />
      </template>
    </el-table-column>
    <el-table-column prop="sex" label="性别" />
    <el-table-column prop="mobile" label="手机号" />
    <el-table-column prop="active" label="状态" />
    <el-table-column prop="create_time" label="创建时间" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="danger" @click="deleteNurse(scope.row)"
          >删除</el-button
        >
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
        <el-button type="primary" @click="uploadAvatar">点击上传</el-button>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio value="1">男</el-radio>
          <el-radio value="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" :min="18" :max="50" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="是否生效" prop="active">
        <el-radio-group v-model="form.active">
          <el-radio :value="0">失效</el-radio>
          <el-radio :value="1">生效</el-radio>
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
  <el-dialog v-model="chooseImgDialogVisible" title="选择头像" width="680">
    <div class="image-list">
      <div
        class="img-box"
        v-for="(item, index) in avatarList"
        :key="item.id"
        @click="SelectedIndex = index"
      >
        <el-icon class="select" v-if="SelectedIndex === index"
          ><Check
        /></el-icon>
        <el-image style="width: 148px; height: 148px" :src="item.url" />
      </div>
    </div>
    <div style="display: flex">
      <el-button
        style="margin-left: 450px"
        @click="chooseImgDialogVisible = false"
        >取消</el-button
      >
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import {
  createNurseAPI,
  deleteNurseAPI,
  getAvatarListAPI,
  getNurseListAPI,
} from "../../../api/nurse";
import { ElMessageBox } from 'element-plus'

const route = useRoute();
const dialogFormVisible = ref(false);
const chooseImgDialogVisible = ref(false);
const formRef = ref();
const SelectedIndex = ref(0);
const deleteArry = [];
const form = reactive({
  id: "",
  name: "",
  age: 0,
  avatar: "",
  sex: "1",
  mobile: "",
  active: 1,
});
const avatarList = ref([]);
const listData = ref({
  list: [],
  total: 0,
});
const rules = ref({
  name: [{ required: true, trigger: "blur", message: "请输入昵称" }],
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  avatar: [{ required: true, trigger: "blur", message: "请选择头像" }],
});
const paginationData = reactive({ pageNum: 1, pageSize: 10 });

onMounted(async () => {
  const res = await getAvatarListAPI();
  avatarList.value = res.data;
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
    }
  });
};

const uploadAvatar = () => {
  chooseImgDialogVisible.value = true;
};

// 关闭弹窗回调
const beforeClose = () => {
  dialogFormVisible.value = false;
  formRef.value.resetFields();
};

// 获取列表
const getNurseList = async () => {
  const res = await getNurseListAPI(paginationData);
  listData.value = res.data;
};

// 提交按钮
const submit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await createNurseAPI({
        name: form.name,
        mobile: form.mobile,
        id: form.id,
        active: form.active,
        age: form.age,
        sex: form.sex,
        avatar: form.avatar,
      });
      if (res.code === 10000) {
        if (form.id) {
          ElMessage.success("编辑成功");
        } else {
          ElMessage.success("新增成功");
        }
        beforeClose();
        getNurseList();
      } else {
        ElMessage.error(res.message);
      }
    } else {
      console.log("error submit", fields);
    }
  });
};

// 头像确认
const confirm = () => {
  form.avatar = avatarList.value[SelectedIndex.value].url;
  chooseImgDialogVisible.value = false;
};

// 删除陪护师
const deleteNurse = (info) => {
  ElMessageBox.confirm("是否删除", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "error",
  })
    .then(() => {
      // deleteArry.push(id);
      // const res = deleteNurseAPI(deleteArry);
      // if (res.code === 10000) {
      //   ElMessage.success("删除成功");
      //   getNurseList();
      // }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

// 处理分页
const handleSizeChange = (value) => {
  paginationData.pageSize = value;
  getNurseList();
};
const handleCurrentChange = (value) => {
  paginationData.pageNum = value;
  getNurseList();
};
</script>

<style lang="less" scoped>
.image-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .img-box {
    position: relative;
    .select {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 24px;
      height: 24px;
      background-color: #67c23a;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-image {
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}
</style>

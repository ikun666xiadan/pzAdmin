<template>
  <div>
    <el-button plain @click="dialogFormVisible = true">新增</el-button>
    <el-dialog v-model="dialogFormVisible" title="权限管理" width="500">
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
            :default-checked-keys="[4, 5]"
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
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getMenuAPI, setMenuAPI } from "../../../api/menu";

const dialogFormVisible = ref(false);
const formRef = ref();
const treeRef = ref();
const form = reactive({
  id: "",
  name: "",
  permissions: "",
});
const menuData = ref([]);
const rules = ref({
  name: [{ required: true, trigger: "blur", message: "请输入权限名称" }],
});

onMounted(async () => {
  const res = await getMenuAPI();
  menuData.value = res.data;
});

const submit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 获取到选择的checkbox数据
      const permissions = JSON.stringify(treeRef.value.getCheckedKeys());
      setMenuAPI({
        name: form.name,
        permissions,
        id: form.id,
      });
    } else {
      console.log("error submit", fields);
    }
  });
};
</script>

<style lang="less" scoped>
</style>

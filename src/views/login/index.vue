<template>
  <div class="login_container">
    <el-row class="login">
      <el-card style="max-width: 480px" class="card">
        <template #header>
          <div class="login_head">
            <img :src="login_head" alt="" class="img" />
          </div>
        </template>
        <div class="login_tip">
          <el-link underline="never" @click="changeStatus">{{
            !isLogin ? "返回登录" : "注册账号"
          }}</el-link>
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          class="login_form"
        >
          <el-form-item prop="userName" label="">
            <el-input
              v-model="loginForm.userName"
              placeholder="手机号"
              :prefix-icon="Iphone"
            />
          </el-form-item>
          <el-form-item prop="passWord" label="">
            <el-input
              v-model="loginForm.passWord"
              type="password"
              placeholder="密码"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          <el-form-item prop="validCode" label="" v-if="!isLogin">
            <div class="validCode">
              <el-input
                v-model="loginForm.validCode"
                placeholder="验证码"
                :prefix-icon="Message"
              />
              <el-button @click="sendCode" :loading="loading">
                {{ isCountDown ? `${surplusTime}秒后重试` : "发送验证码" }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" @click="login" :loading="loading">
              {{ isLogin ? "登录" : "注册" }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Iphone, Lock, Message } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import login_head from "../../../public/login-head.png";
import { useRouter } from "vue-router";

const loginFormRef = ref();
const loading = ref(false);
const isLogin = ref(true);
const codeLoading = ref(false);
const isCountDown = ref(false);
const surplusTime = ref(60);
const timer = ref(null);
const loginForm = reactive({
  userName: "",
  passWord: "",
  validCode: "",
});
const router = useRouter();

const changeStatus = () => {
  isLogin.value = !isLogin.value;
  loginForm.value?.resetFields();
};

// 表单验证规则
const rules = {
  userName: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  passWord: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
  ],
  validCode: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { len: 4, message: "验证码长度应为4位", trigger: "blur" },
  ],
};

// 发送验证码
const sendCode = async () => {
  const phoneReg = /^1[3-9]\d{9}$/;
  if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
    ElMessage.error("请输入正确的手机号！");
    return;
  }

  if (isCountDown.value) return;

  try {
    codeLoading.value = true;
    ElMessage.success("验证码发送成功！");
    startCountDown();
  } catch (error) {
    ElMessage.error("验证码发送失败，请重试");
  } finally {
    codeLoading.value = false;
  }
};

// 开始倒计时
const startCountDown = () => {
  isCountDown.value = true;
  surplusTime.value = 60;

  timer.value = setInterval(() => {
    surplusTime.value--;
    if (surplusTime.value <= 0) {
      clearInterval(timer.value);
      isCountDown.value = false;
    }
  }, 1000);
};

// 登录按钮
const login = async () => {
  if (!loginFormRef.value) return;

  try {
    loading.value = true;
    await loginFormRef.value.validate();

    router.push("/");
    // ElMessage.success("注册成功！");
    ElMessage.success("登录成功！");
  } catch (error) {
    console.error("表单验证失败:", error);
    ElMessage.error("请检查输入信息");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .login {
    display: flex;
    justify-content: center;
    width: 100%;

    .card {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border-radius: 12px;

      :deep(.el-card__header) {
        padding: 0; /* 移除header的内边距 */
      }

      .login_head {
        display: block;
        width: 100%;
        height: auto;
        background: #899fe1;
        border-radius: 12px 12px 0 0;

        .img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px 12px 0 0;
        }
      }

      .login_tip {
        text-align: right;
        margin: 15px 25px 0 0;

        :deep(.el-link) {
          color: #899fe1;
          font-weight: 500;
        }
      }

      .login_form {
        padding: 20px;

        :deep(.el-form-item) {
          margin-bottom: 20px;
        }

        :deep(.el-input) {
          .el-input__wrapper {
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
        }
        .validCode {
          display: flex;
          width: 100%;
          align-items: center;
        }
        .login_btn {
          width: 100%;
          height: 44px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>

<template>
  <div class="header">
    <div class="header_left flex_box">
      <el-icon class="icon"><Fold /></el-icon>
    </div>
    <div class="header_right flex_box">
      <img src="../assets/card_1.png" alt="" />
      <el-dropdown>
        <span class="username">
          admin
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
  
  <script setup>
</script>
  
  <style lang="less" scoped>
.flex_box {
  display: flex;
  align-items: center;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  height: 100%;
  .header_left {
    height: 100%;
    .icon {
      font-size: 20px;
      width: 45px;
      height: 100%;
      cursor: pointer;
    }
    .icon:hover {
      background: #f5f5f5;
    }
  }
  .header_right {
    padding: 20px;
    gap: 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .username {
        cursor: pointer;
    }
  }
}
</style>
  
<template>
  <el-row>
    <el-col :span="10">
      <el-card style="height: 220px">
        <div
          class="user_avatar"
          style="display: flex; align-items: center; gap: 8px"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="homeInfo.user?.user_img"
          />
          <h3>{{ homeInfo.user?.user_name }}</h3>
        </div>
        <template #footer>
          <div style="font-size: 15px">
            当前权限：{{ homeInfo.user?.permission }}
          </div>
          <div style="font-size: 15px">登录IP：{{ homeInfo.user?.ip }}</div>
        </template>
      </el-card>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="13">
      <el-card style="height: 220px">
        <div class="items">
          <div class="type-item" v-for="(item, index) in homeInfo.types" :key="index">
            <el-image style="width: 80px; height: 80px" :src="icon[item.state]" />
            <div class="type-info">
              <h3>{{ item.num }}</h3>
              <div>{{ item.state }}</div>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
        <ECharts :data="homeInfo.typeList"/>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { getHomeInfoAPI } from "../../api/dashnoard";
import ECharts from "../../components/eCharts.vue"
import dzf from "../../assets/images/ods_10.png"
import dfw from "../../assets/images/ods_20.png"
import ywc from "../../assets/images/ods_30.png"
import yqx from "../../assets/images/ods_40.png"

const homeInfo = reactive({});
const icon = {
    '待支付':dzf,
    '待服务':dfw,
    '已完成':ywc,
    '已取消':yqx,
}

onMounted(async () => {
  const res = await getHomeInfoAPI();
  Object.assign(homeInfo, res.data);
  console.log(homeInfo);
});
</script>

<style lang="less" scoped>
.items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  height: 100%;
  .type-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    .type-info {
      gap: 5px;
      font-size: 18px;
    }
  }
}
</style>

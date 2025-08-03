<template>
  <panelHeader :data="route" />
  <div class="search">
    <el-input
      v-model="out_trade_no"
      style="width: 240px"
      placeholder="请输入订单号"
      :prefix-icon="Search"
      clearable
    />
    <el-button type="primary" @click="searchData">查询</el-button>
  </div>
  <el-table style="width: 100%" :data="listData.list">
    <el-table-column prop="out_trade_no" label="订单号" fixed="left" />
    <el-table-column prop="hospital_name" label="就诊医院" />
    <el-table-column prop="service_name" label="就诊服务" />
    <el-table-column prop="serviceImg" label="陪护师">
      <template #default="scope">
        {{ scope.row.companion.name }}
      </template>
    </el-table-column>
    <el-table-column prop="tel" label="陪护师联系电话">
      <template #default="scope">
        {{ scope.row.companion.mobile }}
      </template>
    </el-table-column>
    <el-table-column prop="price" label="总价" />
    <el-table-column prop="paidPrice" label="已付金额" />
    <el-table-column prop="order_start_time" label="下单时间">
      <template #default="scope">
        <span>{{ handelTime(scope.row.create_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="trade_state" label="订单状态">
      <template #default="scope">
        <el-tag type="primary" v-if="scope.row.trade_state === '待服务'">{{
          scope.row.trade_state
        }}</el-tag>
        <el-tag type="success" v-if="scope.row.trade_state === '已完成'">{{
          scope.row.trade_state
        }}</el-tag>
        <el-tag type="info" v-if="scope.row.trade_state === '已取消'">{{
          scope.row.trade_state
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="service_state" label="接单状态">
      <template #default="scope">
        <el-tag
          :type="scope.row.service_state === '未接单' ? 'primary' : 'success'"
          >{{ scope.row.service_state }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="tel" label="联系人手机号" />
    <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <el-popconfirm
          title="是否确认完成"
          confirm-button-text="确认"
          cancel-button-text="取消"
          placement="bottom"
          @confirm="confirm(scope.row.out_trade_no)"
        >
          <template #reference
            ><el-button
              type="primary"
              text
              v-if="scope.row.trade_state === '待服务'"
              >确认完成</el-button
            >

            <el-button type="primary" text v-else disabled>暂无服务</el-button>
          </template>
        </el-popconfirm>
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
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { confirmOrderAPI, getOrderListAPI } from "../../../api/order";
import handelTime from "../../../utils/handelTime";
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const route = useRoute();
const paginationData = reactive({ pageNum: 1, pageSize: 10 });
const out_trade_no = ref("");
const listData = ref({
  list: [],
  total: 0,
});

onMounted(() => {
  getOrderList();
});

// 获取订单列表
const getOrderList = async (out_trade_no) => {
  const res = await getOrderListAPI({ ...paginationData, out_trade_no });
  listData.value = res.data;
};

// 查询
const searchData = () => {
  getOrderList(out_trade_no.value);
};

// 确认服务完成
const confirm = async (id) => {
  const res = await confirmOrderAPI({id});
  if (res.code === 10000) {
    ElMessage.success("确认成功");
    getOrderList();
  }
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
.search {
  display: flex;
  gap: 15px;
  background: #fff;
  padding: 10px;
  justify-content: flex-end;
}
</style>

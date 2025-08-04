<template>
  <div ref="chartRef" style="width: 100%; height: 400px"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref, onUnmounted, watch } from "vue";

const chartRef = ref(null);
let myChart = null;

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

// 转换数据格式为ECharts需要的格式
function transformData(data) {
  return {
    dates: data.map((item) => item.date),
    moneyData: data.map((item) => parseFloat(item.order_money || 0)),
    countData: data.map((item) => item.order_sum || 0),
  };
}

// 初始化图表配置
function initChart() {
  if (!chartRef.value) return;

  myChart = echarts.init(chartRef.value, null, { passive: true });
  updateChart();

  const resizeHandler = () => myChart.resize();
  window.addEventListener("resize", resizeHandler);

  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
    myChart?.dispose();
  });
}

// 更新图表数据
function updateChart() {
  if (!myChart || !props.data.length) return;

  const transformedData = transformData(props.data);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["订单金额", "订单数量"],
    },
    xAxis: {
      type: "category",
      data: transformedData.dates,
      axisLabel: {
        formatter: function (value) {
          return value; 
        },
        rotate: 30, 
      },
    },
    yAxis: [
      {
        type: "value",
        name: "金额",
        axisLabel: {
          formatter: "{value} 元",
        },
      },
      {
        type: "value",
        name: "数量",
        axisLabel: {
          formatter: "{value} 单",
        },
      },
    ],
    series: [
      {
        name: "订单金额",
        type: "bar",
        barWidth: "40%",
        data: transformedData.moneyData,
        itemStyle: {
          color: "#5470C6",
        },
      },
      {
        name: "订单数量",
        type: "line",
        yAxisIndex: 1,
        data: transformedData.countData,
        itemStyle: {
          color: "#91CC75",
        },
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
      },
    ],
    grid: {
      top: "20%",
      right: "10%",
      bottom: "20%",
      left: "10%",
    },
  };

  myChart.setOption(option);
}

onMounted(initChart);

// 监听数据变化
watch(
  () => props.data,
  () => {
    updateChart();
  },
  { deep: true }
);
</script>
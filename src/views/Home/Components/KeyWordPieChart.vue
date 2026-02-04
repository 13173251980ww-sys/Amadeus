<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
// 1. 引入 echarts 核心模块
import * as echarts from 'echarts/core';
// 2. 引入饼图图表 (PieChart)
import { PieChart } from 'echarts/charts';
// 3. 引入提示框，标题，图例组件
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
// 4. 引入渲染器
import { CanvasRenderer } from 'echarts/renderers';
// 5. 引入 Pinia Store (假设你有一个统计数据的 store)
// import { useChickenStores } from "@/stores/chickenStores.js";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer
]);

const chartRef = ref(null);
let myChart = null;
// const chickenStore = useChickenStores();

// 图表配置项
const getOption = () => ({
  title: {
    text: '分类占比统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '访问来源',
      type: 'pie', // 设置为饼图
      radius: '50%', // 饼图半径
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});

onMounted(() => {
  // 初始化
  myChart = echarts.init(chartRef.value);
  myChart.setOption(getOption());

  // 监听窗口大小变化，自动重绘
  window.addEventListener('resize', () => myChart.resize());
});

onUnmounted(() => {
  // 销毁实例，防止内存泄漏
  if (myChart) {
    myChart.dispose();
    window.removeEventListener('resize', () => myChart.resize());
  }
});

// 如果数据来自 Pinia，可以监听 store 变化
/*
watch(() => chickenStore.stats, (newData) => {
  myChart.setOption({
    series: [{ data: newData }]
  });
}, { deep: true });
*/
</script>

<template>
  <div class="container">
    <el-card>
      <!-- 必须指定高度，否则图表不会显示 -->
      <div ref="chartRef" style="width: 100%; height: 400px;"></div>
    </el-card>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>
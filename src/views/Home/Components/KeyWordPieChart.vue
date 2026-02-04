// src/views/Home/Components/KeyWordPieChart.vue
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const props = defineProps({
  apiResult: {
    type: Object,
    default: null
  }
});

const chartRef = ref(null);
let myChart = null;
const resizeHandler = () => { if (myChart) myChart.resize(); };

const defaultData = [
  { value: 1048, name: '搜索引擎' },
  { value: 735, name: '直接访问' },
  { value: 580, name: '邮件营销' },
  { value: 484, name: '联盟广告' },
  { value: 300, name: '视频广告' }
];

function toSeriesData(maybeApiResult) {
  // Accepts structures like: { data: { keyword: [...] } } or directly an array
  let arr = null;
  if (!maybeApiResult) return defaultData;
  if (Array.isArray(maybeApiResult)) arr = maybeApiResult;
  else if (maybeApiResult.data && Array.isArray(maybeApiResult.data.keyword)) arr = maybeApiResult.data.keyword;
  else if (maybeApiResult.keyword && Array.isArray(maybeApiResult.keyword)) arr = maybeApiResult.keyword;
  if (!arr || !arr.length) return defaultData;

  // Convert value like "30%" to numeric value 30
  return arr.map(item => {
    const name = item.name || item.title || '';
    let value = item.value;
    if (typeof value === 'string') {
      // strip percent and commas
      const v = value.replace(/[,\s]/g, '');
      const parsed = parseFloat(v.replace('%', '').trim());
      value = Number.isNaN(parsed) ? 0 : parsed;
    } else if (typeof value !== 'number') {
      value = Number(value) || 0;
    }
    return { name, value };
  });
}

const getOption = (seriesData) => ({
  title: { text: '关键词占比', left: 'center' },
  tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
  legend: { orient: 'vertical', left: 'left' },
  series: [
    {
      name: '关键词',
      type: 'pie',
      radius: '50%',
      data: seriesData && seriesData.length ? seriesData : defaultData,
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
  myChart = echarts.init(chartRef.value);
  const initial = toSeriesData(props.apiResult);
  myChart.setOption(getOption(initial));
  window.addEventListener('resize', resizeHandler);
});

watch(() => props.apiResult, (newVal) => {
  if (!myChart) return;
  const newData = toSeriesData(newVal);
  myChart.setOption({ series: [{ data: newData }] });
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
  window.removeEventListener('resize', resizeHandler);
});
</script>

<template>
  <div class="container">
    <el-card style="border:0; box-shadow:none; padding:0;">
      <div ref="chartRef" style="width: 100%; height: 400px;"></div>
    </el-card>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
import { getCountIsLate } from '@/api/strip/statistic.js'
let echart = echarts;
const dataDis = ref([])
onMounted(() => {

  getCount()
});
const total = ref(0)
const xAxisData = ref([])
const yAxisData = ref([])
const getCount = () => {
  getCountIsLate().then((res) => {
    dataDis.value = res.data.statisticAnalysisStateData
    // const xAxisData = this.dataPoints.map(point => point.x);
    //   const yAxisData = this.dataPoints.map(point => point.y);
    xAxisData.value = res.data.statisticAnalysisReasonIsLate.map(point => point.reason)
    yAxisData.value = res.data.statisticAnalysisReasonIsLate.map(point => point.value)
    for (let i = 0; i < dataDis.value.length; i++) {
      total.value += dataDis.value[i].value
    }
    initChart();
  })
}

onUnmounted(() => {
  echart.dispose;
});

// { value: 80, name: '准点', itemStyle: { color: 'rgb(145,204,117)' } },
//           { value: 15, name: '晚点', itemStyle: { color: 'rgb(238,102,102)' } },
//           { vEalue: 5, name: '取消', itemStyle: { color: 'grey' } }

function initChart() {
  let chart = echart.init(document.getElementById("myEcharts"));
  var chartDom = echart.init(document.getElementById('myEcharts2'));
  chart.setOption({
    title: {
      text: '航班状态分布',
      subtext: '总记录条数' + total.value,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '数量',
        type: 'pie',
        radius: '50%',
        data:
          dataDis.value


        ,
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}',
        },
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
  window.onresize = function () {
    //自适应大小
    chart.resize();
  };
  chartDom.setOption({
    title: {
      text: '晚点原因统计图',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: xAxisData.value
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: yAxisData.value,
        type: 'bar'
      }
    ]
  })
}
</script>
<template>
  <div class="echarts-box">

    <div id="myEcharts" :style="{ width: '600px', height: '300px' }"></div>
    <div id="myEcharts2" :style="{ width: '600px', height: '300px' }"></div>
  </div>
</template>







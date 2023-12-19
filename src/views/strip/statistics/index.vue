<script setup>
import * as echarts from 'echarts';
let echart = echarts;

onMounted(() => {
    initChart();
});

onUnmounted(() => {
    echart.dispose;
});

function initChart() {
   let chart = echart.init(document.getElementById("myEcharts"));
   chart.setOption({
  title: {
    text: '航班状态分布',
    subtext: '以百分比计算',
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
      data: [
        { value: 80, name: '准点', itemStyle: { color: 'rgb(145,204,117)' }},
        { value: 15, name: '晚点', itemStyle: { color: 'rgb(238,102,102)' }},
        { value: 5, name: '取消', itemStyle: { color: 'grey' }},
        
      ],
      label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
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
window.onresize = function() {
     //自适应大小
     chart.resize();
   };
}
</script>
<template>
    <div class="echarts-box">
        
        <div id="myEcharts" :style="{ width: '600px', height: '300px' }"></div>
    </div>
</template>







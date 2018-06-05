<template>
   <div class="small">
<canvas id="mix4" count="4"></canvas>
<chartjs-line target="mix4" :data="[70, 40, 60, 80, 50]" bordercolor="rgba(0,0,0,0.05)" backgroundcolor="rgba(0,0,0,0.05)" :fill="true"></chartjs-line>
<chartjs-bar target="mix4" :data="[20, 30, 20, 10, 5]" backgroundcolor="#b2dfdb"></chartjs-bar>
<chartjs-bar target="mix4" :data="[20, 20, 40, 15, 60]" backgroundcolor="#333333"></chartjs-bar>
<chartjs-bar target="mix4" :data="[50, 10, 60, 55, 35]" :labels="['A', 'B', 'C', 'D', 'E']" backgroundcolor="#bbdefb"></chartjs-bar>
  </div>
</template>

<script>
// import {Bar} from 'vue-chartjs'
// import LineChart from './LineChart.js'
export default {
  // extends: Bar,
  // components: {
  //   LineChart
  // },
  // props: ['itemprop']
}
</script>

<style>
canvas{
  
  width:800px !important;
  height:400px !important;

}
</style>

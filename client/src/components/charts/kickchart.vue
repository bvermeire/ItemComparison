<template>
   <div class="small">
<canvas id="mix4" :count="getcount"></canvas>
<chartjs-line target="mix4" :data="[70, 40, 60, 80, 50]" bordercolor="rgba(0,0,0,0.05)" backgroundcolor="rgba(0,0,0,0.05)" :fill="true"></chartjs-line>
<div v-for="n in getCount()" :key="n">
<chartjs-bar target="mix4" :data=getData() backgroundcolor="#b2dfdb" :labels="mylabels"></chartjs-bar>
<!-- <chartjs-bar target="mix4" :data="[20, 20, 40, 15, 60]" backgroundcolor="#333333"></chartjs-bar> -->
</div>
<!-- <chartjs-bar target="mix4" :data="chartData1" :labels="mylabels" backgroundcolor="#bbdefb"></chartjs-bar> -->

  </div>
</template>

<script>
// import {Bar} from 'vue-chartjs'
export default {
  // extends: Bar,
  data () {
    return {
      getcount: 4,
      getcount2: 3,
      chartData1: [50, 10, 60, 55, 35],
      chartOptions: {responsive: false, maintainAspectRatio: false},
      mylabels: ['A', 'B', 'C', 'D', 'E']
    }
  },
  methods: {
    getCount () {
      console.log('test')
      return 3
    },
    getData () {
      return [20, 30, 20, 10, 5]
    }
  // props: ['itemprop']
  }
}
</script>

<style>
canvas{
  
  width:800px !important;
  height:400px !important;

}
</style>

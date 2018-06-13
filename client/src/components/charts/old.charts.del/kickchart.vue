<template>
<div >
<!-- <canvas v-bind:id="canvasname" v-bind:count="getcount" ></canvas>
<chartjs-line v-bind:target="canvasname" :data="[70, 40, 60, 80, 50]" bordercolor="rgba(0,0,0,0.05)" backgroundcolor="rgba(0,0,0,0.05)" :fill="true"></chartjs-line>
  <div v-for="n in getcount-1" :key="n">
    <chartjs-bar v-bind:target="canvasname" :data="[20, 30, 20, 10, 5]" backgroundcolor="#b2dfdb" :labels="mylabels"></chartjs-bar>
  </div> -->
  
</div>
</template>

<script>
// import {Bar} from 'vue-chartjs'
/* eslint-disable */
export default {
  props: ['canvasID', 'itemID', 'columncount', 'data'],
  // extends: Bar,
  data () {
    return {
      canvasname: this.canvasID,
      getcount: this.columncount +1,
      chartData1: [{
        label: 'test',
        data: [50, 10, 60, 55, 35]
      }],
      chartOptions: {responsive: false, maintainAspectRatio: false, legend: {display: true, text: 'test'}},
      mylabels: ['A', 'B', 'C', 'D', 'E'],
      wantedpricearray: [],
      labelname: 'test'
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

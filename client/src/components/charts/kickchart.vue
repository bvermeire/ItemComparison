<template>
<div >
  {{canvasname}}
<canvas v-bind:id="canvasname" v-bind:count="getcount"></canvas>
<chartjs-line v-bind:target="canvasname" :data="[70, 40, 60, 80, 50]" bordercolor="rgba(0,0,0,0.05)" backgroundcolor="rgba(0,0,0,0.05)" :fill="true"></chartjs-line>
  <div v-for="n in getcount-1" :key="n">
    <chartjs-bar v-bind:target="canvasname" :data="[20, 30, 20, 10, 5]" backgroundcolor="#b2dfdb" :labels="mylabels"></chartjs-bar>
  </div>
</div>
</template>

<script>
import axios from 'axios'
// import {Bar} from 'vue-chartjs'
/* eslint-disable */
export default {
  props: ['passedAccessToken', 'canvasID', 'itemID', 'indextest'],
  // extends: Bar,
  data () {
    return {
      canvasname: this.canvasID,
      getcount: this.indextest +2,
      accessToken: this.passedAccessToken,
      item: this.passedItem,
      chartData1: [50, 10, 60, 55, 35],
      chartOptions: {responsive: false, maintainAspectRatio: false},
      mylabels: ['A', 'B', 'C', 'D', 'E'],
      wantedpricearray: []
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
  },
  created () {
    var config = {
      headers: { Authorization: `Bearer ${this.passedAccessToken}` }
    }
    axios
      .get('http://localhost:8080/api/iteminfo/graph/'+ this.itemID, config)
      .then(response => {
        // this.items = response.data
        console.log(response.data.differentsitesandcolums)
        // this.getcount = response.data.differentsitesandcolums + 1
        console.log(response.data)
      })
  }
}
</script>

<style>
canvas{
  
  width:800px !important;
  height:400px !important;

}
</style>

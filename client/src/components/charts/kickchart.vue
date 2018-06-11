<template>
   <div class="small">
<canvas id="mix4" :count="getcount"></canvas>
<chartjs-line target="mix4" :data="[70, 40, 60, 80, 50]" bordercolor="rgba(0,0,0,0.05)" backgroundcolor="rgba(0,0,0,0.05)" :fill="true"></chartjs-line>
  <div v-for="n in getcount-1" :key="n">
    <chartjs-bar target="mix4" :data=getData() backgroundcolor="#b2dfdb" :labels="mylabels"></chartjs-bar>
  </div>
</div>
</template>

<script>
// import {Bar} from 'vue-chartjs'
/* eslint-disable */
var testdata = {
    "differentsitesandcolums": 2,
    "sitesnames": [
        "https://es.camelcamelcamel.com/Nintendo-Switch-Consola-color-Azul/product/B01N5OPMJW",
        "https://es.camelcamelcamel.com/Nintendo-Switch-Consola-color-Azul/product/B01N5OPMJW"
    ],
    "itemname": "Nintendo Switch",
    "wantedprice": 140,
    "columcount": [
        6,
        6
    ],
    "chartlabel": [
        "2018-05-31T20:13:10.530Z",
        "2018-06-01T13:05:13.085Z",
        "2018-06-04T15:04:40.530Z",
        "2018-06-04T15:06:11.083Z",
        "2018-06-06T09:26:37.450Z",
        "2018-06-11T09:52:56.111Z",
        "2018-05-31T20:13:10.530Z",
        "2018-06-01T13:05:13.085Z",
        "2018-06-04T15:04:40.530Z",
        "2018-06-04T15:06:11.083Z",
        "2018-06-06T09:26:37.450Z",
        "2018-06-11T09:52:56.111Z"
    ],
    "columdata": [
        303.57,
        303.57,
        315,
        315,
        298,
        319,
        303.57,
        303.57,
        315,
        315,
        298,
        319
    ]
}
export default {
  // extends: Bar,
  data () {
    return {
      getcount: 0,
      chartData1: [50, 10, 60, 55, 35],
      chartOptions: {responsive: false, maintainAspectRatio: false},
      mylabels: ['A', 'B', 'C', 'D', 'E'],
      wantedprice: []
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
    this.getcount = testdata.differentsitesandcolums+1

    console.log(this.wantedprice)
    // this.wantedprice = testdata.columcount[0]
    // for(var i=0;i<testdata.differentsitesandcolums;i++){
    //   console.log(testdata.columcount[i])
    // }
  }
}
</script>

<style>
canvas{
  
  width:800px !important;
  height:400px !important;

}
</style>

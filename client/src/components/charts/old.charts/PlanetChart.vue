<template>
<div>
  <canvas id="planet-chart" width="1000" height="400"></canvas>
</div>
</template>
<script>
/* eslint-disable */
import Chart from 'chart.js'
import planetChartData from '../charts/planet-chart-data.js'
export default {
  data() {
    return {
      planetChartData: planetChartData,
    }
  },
  methods: {
    createChart(chartId, chartData) {
    const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    }
  },
  mounted() {
    this.createChart('planet-chart', this.planetChartData)
  }
}
</script>
<style>
</style>

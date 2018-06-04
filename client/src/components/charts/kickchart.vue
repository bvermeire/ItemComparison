<template>
  <div class="small">
    <line-chart v-bind:itemprop="itemprop"></line-chart>
  </div>
</template>

<script>
import {Bar} from 'vue-chartjs'
import LineChart from './LineChart.js'
export default {
  extends: Bar,
  components: {
    LineChart
  },
  props: ['itemprop']
}
</script>

<style>
  .small {
    max-width: 1600px;
    margin:  150px auto;
  }
</style>

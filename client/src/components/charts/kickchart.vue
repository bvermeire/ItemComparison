// <div id="kickchart">
//   <line-chart :colors="['#b00', '#666']" :data="chartData"></line-chart>
// </div>

// export default {
//   data () {
//     return {
//       // chartData: [['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]
//       chartData: [{
//         label: 'Bar Dataset',
//         data: [['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]
//         // type: 'line'
//       },
//       {
//         label: 'Line Dataset',
//         data: [['Jan', 6], ['Feb', 6], ['Mar', 6], ['Apr', 6], ['May', 6]]
//         // Changes this dataset to become a line
//       }],
//       labels: ['January', 'February', 'March', 'April']
//     }
//   }
// }
// </script>
<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>

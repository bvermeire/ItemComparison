import {Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        type: 'bar',
        label: 'Bar Component',
        data: [10, 20, 30]
      },
      {
        type: 'line',
        label: 'Line Component',
        data: [30, 20, 10]
      }]
    }, this.options)
  }
}

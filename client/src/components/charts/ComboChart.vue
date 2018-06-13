<script>
import {Bar} from 'vue-chartjs'
export default {
  extends: Bar,
  props: ['data'],
  data () {
    return {
      datacollection: {
        datasets: [],
        labels: ''
      },
      // Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    getLineData: function () {
      var tempdata = []
      for (var i = 0; i < this.data.columcount[0]; i++) {
        tempdata.push(this.data.wantedprice)
      }
      this.datacollection.datasets.push({
        label: 'Wanted Price',
        data: tempdata,
        borderColor: 'rgb(54, 162, 235)',
        fill: false,
        type: 'line'
      })
    },
    getBarData: function () {
      var count = 0
      var begin = 0
      for (var bars in this.data.columcount) {
        // var newarray = []
        // var counter = 0
        // for (var i in this.data.columncount[bars]) {
        //   console.log(i)
        // }
        console.log('column length ' + this.data.columdata.length)
        count = this.data.columcount[bars]
        console.log('begin from ' + begin)
        console.log('count length ' + count)
        begin = count + begin
        var removecamel = this.data.sitesnames[bars].replace('https://es.camelcamelcamel.com/', '')
        removecamel = (removecamel.split('/')[0])
        this.datacollection.datasets.push({
          label: removecamel,
          data: this.data.columdata
        })
        this.datacollection.labels = this.data.chartlabel
      }
    }
  },
  mounted () {
    this.getLineData()
    this.getBarData()
    // renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options)
  }
}
</script>

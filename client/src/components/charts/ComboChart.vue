<script>
import {Bar} from 'vue-chartjs'
import moment from 'moment'
export default {
  extends: Bar,
  props: ['data'],
  data () {
    return {
      datacollection: {
        datasets: [],
        labels: [],
        fillColor: 'rgb(61,59,66)',
        backgroundColor: '#f87979'
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
        borderColor: '#c0ded9',
        fill: false,
        type: 'line'
      })
    },
    getBarData: function () {
      var templabelarray = []
      for (var i in this.data.chartlabel) {
        for (var j in this.data.chartlabel[i]) {
          if (templabelarray.indexOf(this.data.chartlabel[i][j]) === -1) {
            templabelarray.push(this.data.chartlabel[i][j])
          }
        }
      }
      // do now columndata
      var colorarray = ['#674d3c', '#cab577', '#feb236']
      for (var k in this.data.columdata) {
        var tempcolumdatarray = []
        for (var l in this.data.columdata[k]) {
          if (parseInt(templabelarray.indexOf(this.data.chartlabel[k][l])) === parseInt(l)) {
            tempcolumdatarray.push(this.data.columdata[k][l])
          } else {
            // here is where data is not aligned with label
            // console.log(this.datacollection.labels.indexOf(this.data.chartlabel[k][l]))
            // console.log(l)
            for (var m = 0; m < templabelarray.indexOf(this.data.chartlabel[k][l]); m++) {
              tempcolumdatarray.push(0)
            }
            tempcolumdatarray.push(this.data.columdata[k][l])
          }
          console.log(l)
          console.log(this.data.columdata[k])
          console.log(tempcolumdatarray)
        }
        // to do use moments for date
        var datechangedtemplabelarray = []
        for (var weirdformatdate in templabelarray) {
          datechangedtemplabelarray.push(moment(templabelarray[weirdformatdate]).format('YYYY-MM-DD'))
        }
        // console.log(datechangedtemplabelarray)
        this.datacollection.labels = datechangedtemplabelarray
        var removecamel = this.data.sitesnames[k].replace('https://es.camelcamelcamel.com/', '')
        removecamel = (removecamel.split('/')[0])
        this.datacollection.datasets.push({
          label: removecamel,
          data: tempcolumdatarray,
          backgroundColor: colorarray[k],
          borderColor: colorarray[k]
        })
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

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
  props: ['itemprop'],
  mounted () {
    this.getXlabel()
    this.renderChart({
      labels: [this.itemprop.itemname, 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        type: 'bar',
        backgroundColor: '#ec407a',
        label: 'Bar Component',
        data: [10, 20, 30]
      },
      {
        type: 'line',
        label: 'Line Component',
        // backgroundColor: '#f87979',
        borderColor: '#d4e157',
        fill: 'false',
        data: [20, 20, 20, 20]
      }]
    }, this.options)
  },
  methods: {
    getXlabel () {
      for (var id in this.itemprop.priceperurlday) {
        console.log(this.itemprop.priceperurlday[id].url)
        console.log(this.itemprop.priceperurlday[id].priceonday)
      }
      // console.log(this.itemprop.priceperurlday)
    }
  }
}

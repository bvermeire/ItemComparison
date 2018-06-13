<template>
    <div id="chart_div" style="width: 900px; height: 500px;">
        <GChart
        :packages="['corechart']"
    type="ComboChart"
    :data="chartData"
    :options="chartOptions"
  />
    </div>
</template>
<script>
export default {
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
        ['2004/05', 165, 938, 522, 998, 450, 614.6],
        ['2005/06', 135, 1120, 599, 1268, 288, 682],
        ['2006/07', 157, 1167, 587, 807, 397, 623],
        ['2007/08', 139, 1110, 615, 968, 215, 609.4],
        ['2008/09', 136, 691, 629, 1026, 366, 569.6]
      ],
      chartOptions: {
        chart: {
          title: 'Monthly Coffee Production by Country',
          vAxis: {title: 'Cups'},
          hAxis: {title: 'Month'},
          seriesType: 'bars',
          series: {5: {type: 'line'}}
        }
      }
    }
  }
}
</script>

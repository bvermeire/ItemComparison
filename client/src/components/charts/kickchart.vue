<template>
<div id="kickchart">
  <line-chart :colors="['#b00', '#666']" :data="chartData"></line-chart>
</div>
</template>

<script>
export default {
  data () {
    return {
      chartData: [['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]
    }
  }
}
</script>
<template>
  <div class="itemsoverview">
    TO DO INFOBOX: {{items.length}} items
    <div v-for="(graph, index) in graphdata" :key="index" v-if="loaded">
      {{graph}}
      {{index}}
      <kickchart v-bind:canvasID="graph.itemname" v-bind:indextest="index" v-bind:data="graph"/>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import kickchart from './charts/kickchart'
// import planetchart from './charts/old.charts/PlanetChart'
export default {
  name: 'dashboard',
  props: ['auth', 'authenticated'],
  components: {
    kickchart
  },
  data () {
    return {
      accessToken: '',
      items: '',
      loaded: false,
      graphdata: [],
      testname: 'canvastestname',
      testname2: 'canvatstesadf'
      // headers: { Authorization: `Bearer ${accessToken}` }
    }
  },
  created () {
    this.accessToken = localStorage.getItem('access_token') || null
    // console.log(this.accessToken)
    var config = {
      headers: { Authorization: `Bearer ${this.accessToken}` }
    }
    axios
      .get('http://localhost:8080/api/iteminfo', config)
      .then(response => {
        this.items = response.data
        for (var item in this.items) {
          this.getGraphData(this.items[item])
        }
      })
  },
  methods: {
    getGraphData: async function (item) {
      var config = {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      }
      axios
        .get('http://localhost:8080/api/iteminfo/graph/' + item._id, config)
        .then(response => {
          this.graphdata.push(response.data)
          this.loaded = true
        })
    }
  }
}
</script>

<style>
  a {
    cursor: pointer;
  }
</style>
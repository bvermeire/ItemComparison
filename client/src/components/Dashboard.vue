<template>
  <div class="itemsoverview">
    TO DO INFOBOX: {{items.length}} items
    <div v-for="(item, index) in items" :key="item._id" v-if="loaded">
      {{index}}
      <kickchart v-bind:canvasID="item.itemname" v-bind:passedAccessToken="accessToken" v-bind:itemID="item._id" v-bind:indextest="index"/>
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
        this.loaded = true
      })
  }
}
</script>

<style>
  a {
    cursor: pointer;
  }
</style>
<template>
  <div class="itemsoverview">
      TO DO INFOBOX: {{items.length}} items
      <chart/>
      <kickchart/>
  </div>
</template>
<script>
import axios from 'axios'
import chart from './PlanetChart'
import kickchart from './charts/kickchart'
export default {
  name: 'dashboard',
  props: ['auth', 'authenticated'],
  components: {
    chart,
    kickchart
  },
  data () {
    return {
      accessToken: '',
      items: ''
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
      })
  }
}
</script>

<style>
  a {
    cursor: pointer;
  }
</style>
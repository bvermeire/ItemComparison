<template>
  <div class="itemsoverview">
    TO DO INFOBOX: {{items.length}} items
      <kickchart  v-for="item in items" v-bind:key="item._id" v-bind:itemprop="item"></kickchart>
  </div>
</template>
<script>
import axios from 'axios'
import kickchart from './charts/kickchart'
export default {
  name: 'dashboard',
  props: ['auth', 'authenticated'],
  components: {
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
<template>
  <div class="itemsoverview">
      dashboard view: {{items.length}} items
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'dashboard',
  props: ['auth', 'authenticated'],
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
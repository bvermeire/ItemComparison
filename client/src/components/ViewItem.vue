<template>
<div class="container">
    <p></p>
    <h1 class="h2">Item View</h1>
    {{itemname}}
    {{sitename}}
    <ul class="collection">
      <li class="collection-item">Alvin</li>
      <li class="collection-item">Alvin</li>
      <li class="collection-item">Alvin</li>
      <li class="collection-item">Alvin</li>
    </ul>
</div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'view-item',
  props: ['auth', 'authenticated'],
  data() {
    return {
      itemname: null,
      sitename: [],
      wantedprice: null,
      itemId: '/'
    };
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
    // access to component instance via `vm`
      vm.fetchData(to.params.item_id, localStorage.getItem('access_token'))
    })
    //get items from id to.params.item_id
    //then populate info
  },
  created () {
    this.accessToken = localStorage.getItem('access_token') || null
  },
  methods: {
    async fetchData(item_id, token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer `+ token
        let url = "http://localhost:8080/api/iteminfo/"+item_id
        const response = await axios.get(url)
        this.itemname = response.data.itemname
        this.wantedprice = response.data.wantedprice
        this.sitename = response.data.priceperurlday
        this.itemId = item_id
        return response.data
        
      }
      catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
<div class="container">
  <p></p>
  <h1 class="h2">Items</h1>
  <table class="table table-striped table-responsive-md btn-table">
  <!--Table head-->
  <thead>
      <tr>
          <th ></th>
          <th>Item Name</th>
          <th>Wanted Price</th>
          <th>Found Price</th>
      </tr>
  </thead>
  <!--Table head-->

  <!--Table body-->
  <tbody>
      <tr v-for="item in items" v-bind:key="item.id">
          <td scope="row" class="text-center"><router-link class="secondary-content" v-bind:to="{name: 'view-item', params: {item_id: item._id}}">
          <i class="fas fa-search fa-fw"></i></router-link> <!-- {{"  "+ (items.indexOf(item)+1) }} --></td>
          <th>{{item.itemname}}
          </th>
          <td>{{item.wantedprice}}</td>
          <td>{{item.lowestPrice}}</td>
      </tr>
  </tbody>

  </table>
  <b-button href="/Home">Back</b-button>
  <b-button href="/Home" variant="success" class="btn btn-secondary float-right">TODO New Item</b-button>

  
 </div>
</template>
  
<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'itemsoverview',
  props: ['auth', 'authenticated'],
  data () {
    return {
      accessToken: '',
      items: [],
      itemId: '/',
      // headers: { Authorization: `Bearer ${accessToken}` }
    }
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
    // access to component instance via `vm`
      vm.fetchData(localStorage.getItem('access_token'))
    })
    //get items 
    //then populate info
  },
  created () {
    this.accessToken = localStorage.getItem('access_token') || null
  },
  methods: {
    async fetchData (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer `+ token
        const response = await axios.get('http://localhost:8080/api/iteminfo')
        this.items = response.data
        return response
      }
      catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style>
i{
  color:black;
}
</style>


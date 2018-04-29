<template>
 <div>
   <p></p>
   <h1 class="h2">Items</h1>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Wanted Price</th>
          <th>Sites</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" v-bind:key="item._id">
          <td>{{item.itemname}}</td>
          <td>{{item.wantedprice}}</td>
          <td v-for="site in urls" v-bind:key="site._id" v-if="site.temp2==item._id">{{site.temp}}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
      items: '',
      urls:[]
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
        for (var count in this.items){
          var temp =[]
          var temp2 = this.items[count]._id
          for (var test in this.items[count].priceperurlday){
            temp.push(this.items[count].priceperurlday[test].url)
          }
          var temp3 = {temp2, temp}
          this.urls.push(temp3)
        }
        return response
      }
      catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

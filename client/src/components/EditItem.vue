<template>
   <div>
     <div><h1>{{itemname}}</h1>
     <h1>{{wantedprice}}</h1>
     </div>
     
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'edititem',
  props:['id'], 
  data() {
    return {
      itemname: 'test',
      sitename: [],
      wantedprice: null,
      itemId: '/'
    };
  },
  mounted(){
    this.fetchData(this.id, localStorage.getItem('access_token'))
  },
  methods: {
    async fetchData(id, token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer `+ token
        let url = "http://localhost:8080/api/iteminfo/"+id
        const response = await axios.get(url)
        this.itemname = response.data.itemname
        this.wantedprice = response.data.wantedprice
        this.sitename = response.data.priceperurlday
        return response.data
        
      }
      catch (error) {
        console.log(error)
      }
    }
  }
}
</script>


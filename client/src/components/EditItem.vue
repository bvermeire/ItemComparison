<template>
<v-list>
  <v-list-tile v-for="site in sitenames" :key="site._id">
    <v-list-tile-action>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title v-text="site.url">
        test
      </v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-avatar>
    </v-list-tile-avatar>
  </v-list-tile>
</v-list>      
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
      sitenames: [],
      wantedprice: null,
      itemId: '/',
      e6:1

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
        this.sitenames = response.data.priceperurlday
        return response.data
        
      }
      catch (error) {
        console.log(error)
      }
    }
  }
}
</script>


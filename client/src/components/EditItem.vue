<template>
<div>
<v-form ref="form" v-model="valid" lazy-validation v-if="itemnameview" color="primary" dark>
      <v-text-field
        v-model="site.url"
        :counter="30"
        label="Site Name"
        required
        append-icon="save" :append-icon-cb="saveSite"
      ></v-text-field>
</v-form>  
<v-list v-if="!itemnameview">
  <v-list-tile v-for="site in sitenames" :key="site._id">
    <v-list-tile-content>
      <v-list-tile-title v-text="site.url"></v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action v-if="!itemnameview">
      <v-btn icon ripple @click="editname(site)">
        <v-icon color="grey lighten-1" >info</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</v-list>      
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
      sitenames: [],
      wantedprice: null,
      itemId: '/',
      e6:1,
      itemnameview: false,
      valid: false,
      site: ''
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
    },
    editname(site){
      this.itemnameview=!this.itemnameview
      this.site = site
    },
    saveSite() {

    }
  }
}
</script>


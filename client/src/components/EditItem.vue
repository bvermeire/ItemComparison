<template>
<div>
<div v-if="!itemnameview">
<v-list two-line subheader>
            <v-subheader inset>Edit Item</v-subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Item Name:</v-list-tile-title>
                <v-list-tile-sub-title>{{ itemname }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click="editname(itemname)">
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="site in sitenames" :key="site._id">
              <v-list-tile-content>
                <v-list-tile-title>Site Name:{{site.index}}</v-list-tile-title>
                <v-list-tile-sub-title>{{ site.url }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click="editsite(site)">
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
</v-list>
</div>
<div v-if="siteview" class="grey darken-1
">
  <v-form ref="form" v-model="valid" lazy-validation color="primary" dark>
    <v-text-field
      v-model="site.url"
      :counter="30"
      label="Site Name"
      required
      append-icon="save" :append-icon-cb="saveSite"
    ></v-text-field>
  </v-form>  
</div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'edititem',
  props: ['id', 'itemnameviewprop'],
  data () {
    return {
      itemname: 'test',
      sitenames: [],
      wantedprice: null,
      itemId: '/',
      e6: 1,
      itemnameview: false,
      siteview: false,
      valid: false,
      site: ''
    }
  },
  beforeMount () {
    this.itemnameview = false
    this.siteview = false
    this.fetchData(this.id, localStorage.getItem('access_token'))
    this.itemnameview = this.itemnameviewprop
  },
  mounted () {
    this.itemnameview = false
  },
  methods: {
    async fetchData (id, token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ` + token
        let url = 'http://localhost:8080/api/iteminfo/' + id
        const response = await axios.get(url)
        this.itemname = response.data.itemname
        this.wantedprice = response.data.wantedprice
        this.sitenames = response.data.priceperurlday
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    editsite (site) {
      this.siteview = !this.siteview
      this.site = site
    },
    saveSite () {
    },
    itemname (name) {
      this.itemnameview = !this.itemnameview
    }
  }
}
</script>


<template>
<div>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
    <!-- for edit item -->
    <createnew/>
  </v-dialog>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.itemname }}</td>
      <td class="text-xs-right">{{ props.item.wantedprice }}</td>
      <td class="text-xs-right">{{ props.item.lowestPrice }}</td>
      <td class="text-xs-right">{{ props.item.currentPrice }}</td>
      <td class="justify-center layout px-0">
        <v-btn icon class="mx-0" @click="editItem(props.item)">
          <v-icon color="teal">edit</v-icon>
        </v-btn>
        <v-btn icon class="mx-0" @click="deleteItem(props.item)">
          <v-icon color="pink">delete</v-icon>
        </v-btn>
      </td>
    </template>
    <template slot="no-data">
      <v-btn color="primary" @click="fetchData">Reset</v-btn>
    </template>
  </v-data-table>
    </div>
</template>
  
<script>
/* eslint-disable */
import axios from 'axios'
import createnew from './CreateNew'
export default {
  name: 'itemsoverview',
  props: ['auth', 'authenticated'],
  components: {
    createnew
  },
  data () {
    return {
      dialog: false,
      accessToken: '',
      editedIndex: -1,
      items: [],
      headers: [
        { text: 'Item Name', value: 'itemname', sortable: true, },
        { text: 'Wanted Price', value: 'wantedprice' },
        { text: 'Lowest Price', value: 'lowestPrice' },
        { text: 'Current Price', value: 'currentPrice' }
      ],
      
      // headers: { Authorization: `Bearer ${accessToken}` }
    }
  },
  created () {
    this.accessToken = localStorage.getItem('access_token') || null
    
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
    // access to component instance via `vm`
      vm.fetchData(localStorage.getItem('access_token'))
    })
    //get items 
    //then populate info
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
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      console.log("delete item" + this.items[index])
    }
  }
}
</script>
<style>
.icon {
  display: inline-block;
}
</style>


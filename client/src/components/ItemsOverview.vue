<template>
<div>
  <v-container fluid >
    <v-layout align-content-start>
      <v-flex xs2>
        <v-dialog v-model="dialog" max-width="600px" >
          <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
          <!-- for new item component -->
          <createnew step1="1" v-on:event_child="closeDialog" v-if="readynewItemComponent&&dialog"/>
        </v-dialog>
         <v-dialog v-model="dialogedit" max-width="600px">
          <!-- for item details -->
          <component :is="myComponent" :id="itemID" itemnameviewprop=false v-on:event_child="closeDialogEdit" v-if="readyneweditComponent&&dialogedit"></component>
        </v-dialog>
      </v-flex>
    </v-layout>
    <!--data table-->
    <v-layout row justify-center>
      <v-flex d-flex>
        <v-data-table 
          :headers="headers"
          :items="items"
          hide-actions
          ref="vuetable"
          class="elevation-1"
        > 
          <template slot="items" slot-scope="props">
            <td>{{ props.item.itemname }}</td>
            <td class="text-xs-right">{{ props.item.wantedprice }}</td>
            <td class="text-xs-right">{{ props.item.lowestPrice }}</td>
            <td class="text-xs-right">{{ props.item.currentPrice }}</td>
            <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="scrapeItem(props.item)">
              <v-icon color="green">perm_data_setting</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs0>

      </v-flex>
      <v-flex xl10 >
        
      </v-flex>
    </v-layout> 
  </v-container>

    </div>
</template>
  
<script>
import axios from 'axios'
import createnew from './CreateNew'
import edititem from './EditItem'
export default {
  name: 'itemsoverview',
  props: ['auth', 'authenticated'],
  components: {
    createnew,
    edititem
  },
  data () {
    return {
      dialog: false,
      dialogedit: false,
      readynewItemComponent: true,
      readyneweditComponent: true,
      myComponent: '',
      accessToken: '',
      editedIndex: -1,
      itemID: 'parent',
      items: [],
      headers: [
        { text: 'Item Name', value: 'itemname', sortable: true },
        { text: 'Wanted Price', value: 'wantedprice' },
        { text: 'Lowest Price', value: 'lowestPrice' },
        { text: 'Current Price', value: 'currentPrice' }
      ]

      // headers: { Authorization: `Bearer ${accessToken}` }
    }
  },
  created () {
    this.accessToken = localStorage.getItem('access_token') || null
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
    // access to component instance via `vm`
      vm.fetchData(localStorage.getItem('access_token'))
    })
    // get items
    // then populate info
  },
  methods: {
    async fetchData (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ` + token
        const response = await axios.get('http://localhost:8080/api/iteminfo')
        this.items = response.data
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async postToDBNewItem (item, token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ` + token
        const response = await axios.post('http://localhost:8080/api/iteminfo', {itemname: item.name, wantedprice: item.wantedprice, url: item.sites})
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async deleteItemFromDB (itemid, token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ` + token
        const response = await axios.delete('http://localhost:8080/api/iteminfo/' + itemid)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        this.deleteItemFromDB(item._id, this.accessToken)
        this.items.splice(index, 1)
      }
    },
    closeDialog: function (item) {
      this.dialog = false
      if (item.done === true) {
        this.postToDBNewItem(item, localStorage.getItem('access_token'))
        this.fetchData(this.accessToken)
      }
    },
    closeDialogEdit: function (item) {
      this.dialogedit = false
      this.fetchData(this.accessToken)
    },
    editItem (item) {
      this.dialogedit = true
      this.itemID = item._id
      this.myComponent = edititem
    },
    scrapeItem (item) {
      let url = 'http://localhost:8080/api/iteminfo/scrape/' + item._id
      this.scrapeItemGet(url)
    },
    async scrapeItemGet (url) {
      try {
        const response = await axios.get(url)
        // console.log(response.data)
        await this.fetchData(this.accessToken)
        return response
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style>
.icon {
  display: inline-block;
}
.flex-grid-thirds {
  display: flex;
  justify-content: space-between;
}
</style>


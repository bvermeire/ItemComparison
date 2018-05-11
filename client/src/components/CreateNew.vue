<template>
<v-stepper  v-model="e6" vertical>
<!-- itemname field -->
  <v-stepper-step step="1" :complete="e6 > 1" >
    Name of the site{{step1}}
  </v-stepper-step>
  <v-stepper-content step="1">
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="item.name"
        :rules="nameRules"
        :counter="40"
        label="Name"
        required
        >
      </v-text-field>
    </v-form>
    <v-btn color="primary" @click.native="e6 = 2">Continue</v-btn>
    <v-btn flat @click.native="emit">Cancel</v-btn>
  </v-stepper-content>
<!-- wantedprice field -->
  <v-stepper-step step="2" :complete="e6 > 2">
      Wanted price 
  </v-stepper-step>
      <v-stepper-content step="2">
    <v-form ref="form" v-model="valid">
      <v-text-field
        type=number
        v-model="item.wantedprice"
        :rules="priceRules"
        :counter="10"
        label="Wanted Price"
        required
        >
      </v-text-field>
    </v-form>
    <v-btn color="primary" @click.native="e6 = 3">Continue</v-btn>
    <v-btn flat @click.native="e6 = 1">Cancel</v-btn>
  </v-stepper-content>
  <v-stepper-step step="3" :complete="e6 > 3">
    Site addition   
  </v-stepper-step>
    <v-stepper-content step="3">
      <v-form ref="form" v-model="valid">
        <label v-if="item.sites.length>0" class="site_list_label">Sites:</label>
        <v-flex>
          <ul class="site_list">
            <li v-for="(item,index) in item.sites" :key="index">
              {{item}}
              <v-btn flat icon color="white" @click="removeSite(index)" class="btn_remove_site">
                <v-icon dark small>delete</v-icon>
              </v-btn>
            </li>
          </ul>
        </v-flex>
        <v-flex xs10 class="mb-3">
          <v-text-field ref="addSiteRef" label="Add Site" v-model="site" append-icon="add" :append-icon-cb="addSite"></v-text-field>
        </v-flex>
    </v-form>
        <v-btn color="primary" @click.native="emit2">Save</v-btn>
        <v-btn flat @click.native="e6 = 2">Cancel</v-btn>
      </v-stepper-content>
      
    </v-stepper>
</template>

<script>
/* eslint-disable */
export default {
    name: 'createnew',
    props: ['step1'],
    data () {
        return {
            e6: 1,
            dialog: false,
            valid: false,
            site: '',
            item: {
                name: '',
                wantedprice: '',
                sites: [],
                done: false
            }, 
            nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 40 || 'Name must be less than 10 characters'],
            priceRules: [
      v => !!v || 'Price is required',          
      v => v.length <= 10 || 'Price must be less than 10 characters'],
        }
    },
    beforemount: function(){
      this.e6=this.step1
    },
    methods: {
        close (){
            this.item.name = ''
            this.item.wantedprice = ''
            this.item.sites = []
            this.item.done = false
     
        },
        emit: function() {
            this.e6 = 1
            this.$emit('event_child', this.item)
            this.close()
		    },
        emit2: function() {
            this.e6 = 1
            this.item.done = true
            this.$emit('event_child', this.item)
            this.close()
        },
        addSite: function(){
          this.item.sites.push(this.site)
          this.site=""
        },
        removeSite: function(index){
          this.item.sites.splice(index, 1)
        }
    }
}
</script>

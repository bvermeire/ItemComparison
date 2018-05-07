<template>
  <v-stepper class="dialog" v-model="e6" vertical>
      <v-stepper-step step="1" :complete="e6 > 1" >
        Name of the site
        <small>{{name}}</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        
            <v-form v-model="valid">
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="10"
                    label="Name"
                    required
                >
                </v-text-field>
            </v-form>
       
        <v-btn color="primary" @click.native="e6 = 2">Continue</v-btn>
        <v-btn flat @click.native="dialog = false">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-step step="2" :complete="e6 > 2">Configure analytics for this app</v-stepper-step>
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click.native="e6 = 3">Continue</v-btn>
        <v-btn flat @click.native="e6 = 1">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-step step="3" :complete="e6 > 3">Select an ad format and name ad unit</v-stepper-step>
      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click.native="e6 = 4">Continue</v-btn>
        <v-btn flat @click.native="e6 = 2">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-step step="4">View setup instructions</v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click.native="e6 = 1">Continue</v-btn>
        <v-btn flat @click.native="e6 = 3">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
</template>

<script>
/* eslint-disable */
export default {
    name: 'createnew',
    data () {
        return {
            e6: 1,
            dialog: false,
            valid: false,
            name: '',
            nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters'],
        }
    },
    methods: {
        close (){
            this.name = ''
        }
    }
}
</script>

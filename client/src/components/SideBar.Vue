<template>
  <div id="app">
  <v-app id="inspire" >
    <v-navigation-drawer
      fixed
      v-model="drawer"
      clipped
      app
      class="blue-grey lighten-5"
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>show_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>shopping_cart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Items</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue-grey lighten-1" dark fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center"><span class="title">Application</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout()">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
  </v-app>
  </div>
</template>
<script>
import AuthService from '../auth/AuthService'
const auth = new AuthService()
const { logout } = auth
export default {
  data () {
    return {
      drawer: null
    }
  },
  methods: {
    logout
  }
}
</script>

<style>

</style>

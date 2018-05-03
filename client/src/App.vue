<template>
  <div id="app">
  <div class="sidebar-sticky" v-if="authenticated"> <sidebar/></div>
  <div class="center-align valign-wrapper" v-if="!authenticated">
    <v-app id="inspire">
      <v-card>
        <v-card-text>
          <p class="text-xs-center">
            <router-view 
            :auth="auth" 
            :authenticated="authenticated">
            </router-view>
          </p>
        </v-card-text>
      </v-card>
    </v-app>
  </div>
</div>
</template>

<script>
import AuthService from './auth/AuthService'
import sidebar from './components/SideBar'
const auth = new AuthService()
const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'app',
  components: {
    sidebar
  },
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated,
      drawer: null
    }
  },
  methods: {
    login,
    logout
  }
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

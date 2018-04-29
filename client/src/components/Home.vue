<template>

  <div>
    <h4 v-if="authenticated">
        <dashboard/>
    </h4>
    <h4 v-if="!authenticated">

      <div class="container col-lg-10 col-md-3 col-sm-4 col-xs-6 " style="text-align:center" >
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
      </div>
      
    </h4>
  </div>
</template>

<script>
import dashboard from './Dashboard'
export default {
  name: 'home',
  components: {
    dashboard
  },
  props: ['auth', 'authenticated']
}
</script>

<style>
  a {
    cursor: pointer;
  }
</style>


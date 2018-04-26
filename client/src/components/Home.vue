<template>

  <div>
    <h4 v-if="authenticated">
        <dashboard/>
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
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


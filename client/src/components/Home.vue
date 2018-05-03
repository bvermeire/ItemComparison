<template>
<v-layout justify-left align-left v-if="authenticated">
          <v-flex shrink>
            asdfasdf
          </v-flex>
</v-layout>

 

 
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

</style>


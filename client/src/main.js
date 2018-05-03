// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import { Table } from 'bootstrap-vue/es/components';
// import { ListGroup } from 'bootstrap-vue/es/components';
import { Button } from 'bootstrap-vue/es/components';
import Vuetify from 'vuetify'
 
Vue.use(Vuetify)
Vue.use(Button);
// Vue.use(ListGroup);
// Vue.use(Table);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

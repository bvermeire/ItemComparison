import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import Callback from '@/components/Callback'
import ItemsOverview from '@/components/ItemsOverview'
import AuthService from '../auth/AuthService'
Vue.use(Router)
const auth = new AuthService()

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/items',
      name: 'ItemsOverview',
      component: ItemsOverview,
      beforeEnter: (to, from, next) => {
        if (!auth.isAuthenticated()) {
          router.push({ path: 'Home' })
          next(false)
        } else {
          next()
        }
      }
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

export default router

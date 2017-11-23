import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Signin from '@/components/Auth/Signin'
import Notifications from '@/components/Notifications/Notifications'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Notifications
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications
    }
  ],
  mode: 'history'
})

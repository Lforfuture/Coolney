import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import  Details  from '@/views/Details.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: './details'
  },
  {
    path: '/details',
    component: Details
  }
  
]

const router = new VueRouter({
  routes
})

export default router

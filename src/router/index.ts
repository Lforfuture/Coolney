import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Details from '@/views/Details.vue'
import Statistics from '@/views/Statistics.vue'
import MakeRecord from '@/views/MakeRecord.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: './details'
  },
  {
    path: '/details',
    component: Details
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/make_record',
    component: MakeRecord
  }
]

const router = new VueRouter({
  routes
})

export default router

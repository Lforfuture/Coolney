import Layout from '@/components/Layout.vue';
import "default-passive-events";
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import {store} from './store'
import Icon from '@/components/Icon.vue'
import "vant/lib/index.css";
Vue.config.productionTip = false
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

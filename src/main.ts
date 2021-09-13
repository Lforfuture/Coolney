import Layout from '@/components/Layout.vue';
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('Layout',Layout)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

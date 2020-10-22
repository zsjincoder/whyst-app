import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);

import plugins from '@/plugins'
Vue.use(plugins);

//vuex
import store from '@/store'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()

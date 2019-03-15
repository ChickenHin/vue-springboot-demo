// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$axios', { value: axios })
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-type'] = 'application/json'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

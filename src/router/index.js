import Vue from 'vue'
import Router from 'vue-router'
import DataShow from '@/components/DataShow'
import ConfigShow from '@/components/ConfigShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dataShow',
      name: 'DataShow',
      component: DataShow
    },
    {
      path: '/configShow',
      name: 'ConfigShow',
      component: ConfigShow
    }
  ]
})

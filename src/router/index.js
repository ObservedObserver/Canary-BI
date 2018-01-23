import Vue from 'vue'
import Router from 'vue-router'
import MainBoard from '@/components/main.vue'
import testBoard from '@/components/Operators/Tool/range.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainBoard',
      component: MainBoard
    },
    {
      path: '/test',
      name: 'test',
      component: testBoard
    }
  ]
})

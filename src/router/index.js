import Vue from 'vue'
import Router from 'vue-router'
import AnalysisPage from '@/pages/analysis.vue'
import IntroPage from '@/pages/intro/index.vue'
import AccessPage from '@/pages/access/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/analysis',
      name: 'analysis',
      component: AnalysisPage
    },
    {
      path: '/',
      name: 'intro',
      component: IntroPage
    },
    {
      path: '/access',
      name: 'access',
      component: AccessPage
    }
  ]
})

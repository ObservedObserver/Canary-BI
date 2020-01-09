import Vue from 'vue'
import Vuex from 'vuex'
// import {sum, count, average, median} from './statistic.js'
import { getInitState } from './state/init.js'
import getters from './getters/index.js'
import mutations from './mutations/index.js'
import actions from './actions/index.js'
// import Core from 'bi-dataset'
Vue.use(Vuex)
// const StatFuncs = {
//   'Sum': sum,
//   'Count': count,
//   'Mean': average,
//   'Median': median
// }

var store = new Vuex.Store({
  state: getInitState(),
  getters,
  mutations,
  actions
})

export { store }

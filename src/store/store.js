import Vue from 'vue'
import Vuex from 'vuex'
// import {sum, count, average, median} from './statistic.js'
import {API} from '@/store/API/api.js'
import {
  filterData,
  transLabel,
  // transDimension,
  // transData,
  dimensionValueSet,
  dataTree,
  tree2Matrix,
  // transTree,
  transTreeDFS
} from 'bi-dataset/main.js'
import {dataDrop} from './util/drop.js'
// import Core from 'bi-dataset'
Vue.use(Vuex)
// const StatFuncs = {
//   'Sum': sum,
//   'Count': count,
//   'Mean': average,
//   'Median': median
// }
var store = new Vuex.Store({
  state: {
    globalData: [],
    globalDataLabels: {
      filter: [],
      data: [],
      X: [],
      Y: [],
      dimensions: [],
      measures: [],
      time: []
    },
    currentLabel: {},
    dataAggregation: true,
    filters: [],
    func: ['sum', 'average', 'count'],
    pickedFunc: 'sum',
    valueSet: {},
    dashBoard: [],
    page: 'Main'
  },
  getters: {
    originLabels (state) {
      let {dimensions, measures} = transLabel({xlabels: state.globalDataLabels.data})
      return {dimensions, measures}
    },
    biLabels (state) {
      let {dimensions, measures} = transLabel({xlabels: state.globalDataLabels.X, ylabels: state.globalDataLabels.Y})
      return {dimensions, measures}
    },
    viewData (state) {
      let viewData = []
      viewData = filterData({filters: state.filters, rawData: state.globalData})
      return viewData
    },
    biTree (state, getters) {
      let {dimensions, measures} = getters.biLabels
      let statFunc = state.pickedFunc
      let tree = dataTree({rawData: getters.viewData, dimensions, measures, statFunc})
      return tree
    },
    labelTree (state, getters) {
      let {measures} = getters.biLabels
      let btree = getters.biTree
      // let btree = dataTree({rawData: getters.viewData, dimensions, measures})
      console.log('measures', measures)

      let ans = transTreeDFS({
        bnode: ['root', btree],
        lnode: {label: 'root', children: []},
        measures,
        level: 0
      })
      return ans
    },
    biMatrix (state, getters) {
      let tree = getters.biTree
      // console.log(tree)
      let ans = tree2Matrix({tree})
      return ans
    },
    valueSet (state, getters) {
      let {dimensions, measures} = getters.biLabels
      let valueSet = dimensionValueSet({
        rawData: getters.viewData,
        dimensions: dimensions.concat(measures)
      })
      return valueSet
    }
  },
  mutations: {
    drag (state, {component, label}) {
      state.currentLabel = state.globalDataLabels[component][label]
      if (component !== 'dimensions' && component !== 'measures' && component !== 'time') {
        state.globalDataLabels[component].splice(label, 1)
      }
    },
    drop (state, {ev, component}) {
      ev.preventDefault()
      dataDrop(state, component)
      state.currentLabel = {}
    },
    changeFilter (state, params) {
      state.filters = params
    },
    changeFunc (state, para) {
      // para = 'Sum'
      state.pickedFunc = para
    },
    changeAggregation (state, status) {
      state.dataAggregation = status
    },
    saveChart (state, option) {
      state.dashBoard.push(option)
    },
    gotoPage (state, page) {
      state.page = page
    },
    updateList (state, list) {
      state.dashBoard = list
    }
  },
  actions: {
    getMainData (context) {
      var state = context.state
      API.getMainData((res) => {
        state.globalData = res
        state.globalData.forEach((item, index, arr) => {
          arr[index]['_bi_count'] = 1
          arr[index]['score'] = parseInt(Math.random() * 10)
        })
        if (state.globalData.length !== 0) {
          let _keys = Object.keys(state.globalData[0])
          for (let i = 0; i < _keys.length; i++) {
            let item = {
              name: _keys[i],
              type: typeof state.globalData[0][_keys[i]]
            }
            state.globalDataLabels.data.push(item)
          }
        }
        let {dimensions, measures} = context.getters.originLabels
        state.valueSet = dimensionValueSet({rawData: res, dimensions: dimensions.concat(measures)})
        dimensions.forEach((dim) => {
          state.globalDataLabels.dimensions.push({
            name: dim,
            type: 'string'
          })
        })
        measures.forEach((mea) => {
          state.globalDataLabels.measures.push({
            name: mea,
            type: 'number'
          })
        })
      })
    }
  }
})

export {store}

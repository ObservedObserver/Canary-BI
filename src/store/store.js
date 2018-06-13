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
} from '@/../../Bi-Dataset/main.js'
import timeLabel from './util/timelabel.js'
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
    func: ['Sum', 'Mean', 'Median', 'Count'],
    pickedFunc: 'Sum',
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

      let tree = dataTree({rawData: getters.viewData, dimensions, measures})
      return tree
    },
    labelTree (state, getters) {
      let btree = getters.biTree
      // let ans = transTree(btree)
      let {measures} = getters.biLabels
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
      if (component === 'dimensions' && state.currentLabel.type === 'number') {
        state.globalDataLabels[component].push({
          name: state.currentLabel.name,
          type: 'string'
        })
      } else if (component === 'measures' && state.currentLabel.type === 'string') {
        state.globalDataLabels[component].push({
          name: state.currentLabel.name,
          type: 'number'
        })
      } else if (component === 'time' && state.currentLabel.type === 'string') {
        // 临时判断机制，正式版应支持任意数据格式饿转化
        if (typeof state.globalData[0][state.currentLabel.name] === 'string' && state.globalData[0][state.currentLabel.name].split('-').length > 1) {
          state.globalDataLabels[component].push({
            name: state.currentLabel.name,
            type: 'time'
          })
          // 这里globaldata不受计算属性获得label可以保证新创建的year, month不会被展示
          state.globalData = timeLabel({rawData: state.globalData, timeDimension: state.currentLabel.name})
        }
      } else if (component !== 'measures' && component !== 'dimensions' && component !== 'time') {
        state.globalDataLabels[component].push({
          name: state.currentLabel.name,
          type: state.currentLabel.type
        })
      }
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

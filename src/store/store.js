import Vue from 'vue'
import Vuex from 'vuex'
import {sum, count, average, median} from './statistic.js'
import {API} from '@/store/API/api.js'
import {filterData, transLabel, transDimension, transData, dimensionValueSet, dataTree} from 'bi-dataset/main.js'
// import Core from 'bi-dataset'
Vue.use(Vuex)
const StatFuncs = {
  'Sum': sum,
  'Count': count,
  'Mean': average,
  'Median': median
}
var store = new Vuex.Store({
  state: {
    globalData: [],
    globalDataLabels: {
      filter: [],
      data: [],
      X: [],
      Y: [],
      dimension: []
    },
    currentLabel: {},
    dataAggregation: true,
    filters: [],
    func: ['Sum', 'Mean', 'Median', 'Count'],
    pickedFunc: 'Sum',
    valueSet: {}
  },
  getters: {
    originDataset (state, getters) {
      let dataset = []
      if (typeof state.globalData !== 'undefined' && state.globalData.length > 0) {
        // dataset.push(Object.keys(state.globalData[0]))
        if (state.globalDataLabels.data.length === 0) {
          return dataset
        }
        let {dimensions, measures} = getters.originLabels
        let _keys = dimensions.concat(measures)
        dataset.push(_keys)
        state.globalData.forEach((item, index) => {
          dataset.push([])
          _keys.forEach((key) => {
            dataset[index + 1].push(item[key])
          })
        })
      }
      return dataset
    },
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
    biDimension (state, getters) {
      let rawData = getters.viewData
      let {dimensions} = getters.biLabels
      console.log('current labels', dimensions)
      let {mixDim} = transDimension({dimensions, rawData})
      return {
        mixDim
      }
    },
    biDataset (state, getters) {
      let {dimensions, measures} = getters.biLabels
      if (((dimensions.length + measures.length > 0) && state.globalData.length > 0)) {
        let rawData = getters.viewData
        console.log('before dimension')
        let {mixDim} = getters.biDimension
        console.log('end dimension')
        // let filters = [{
        //   column: 'value',
        //   type: 'equal',
        //   value: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
        // }]
        console.log('today', mixDim)
        let result = transData({rawData, measures, mixDim, statFunc: StatFuncs[state.pickedFunc]})
        console.log('got data')
        return result
      } else {
        return []
      }
    },
    // biTree (state, getters) {
    //   let {dimensions, measures} = getters.biLabels
    //   // if (dimension.length > 0) {
    //   //
    //   // }
    // },
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
      if (component !== 'data') {
        state.globalDataLabels[component].splice(label, 1)
      }
    },
    drop (state, {ev, component}) {
      ev.preventDefault()
      if (component !== 'data') {
        state.globalDataLabels[component].push({
          name: state.currentLabel.name,
          type: state.currentLabel.type
        })
        state.currentLabel = {}
      }
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
    }
  },
  actions: {
    getMainData (context) {
      var state = context.state
      API.getMainData((res) => {
        state.globalData = res
        state.globalData.forEach((item, index, arr) => {
          arr[index]['_bi_count'] = 1
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
      })
    }
  }
})

export {store}

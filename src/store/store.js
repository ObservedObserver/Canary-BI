import Vue from 'vue'
import Vuex from 'vuex'
import {sum, count, average, median} from './statistic.js'
import {API} from '@/store/API/api.js'
import {filterData, transLabel, transDimension, transData, dimensionValueSet} from '@/../../Bi-Dataset/main.js'
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
      let {mixDim, lowerMixDim} = transDimension({dimensions, rawData})
      return {
        mixDim,
        lowerMixDim
      }
    },
    biDataset (state, getters) {
      let {dimensions, measures} = getters.biLabels
      if (((dimensions.length + measures.length > 0) && state.globalData.length > 0)) {
        let rawData = getters.viewData
        let {mixDim} = getters.biDimension
        // let filters = [{
        //   column: 'value',
        //   type: 'equal',
        //   value: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
        // }]
        console.log('today', {rawData, measures, mixDim, statFunc: StatFuncs[state.pickedFunc]})
        return transData({rawData, measures, mixDim, statFunc: StatFuncs[state.pickedFunc]})
      } else {
        return []
      }
    }
  },
  mutations: {
    drag (state, paras) {
      console.log('drag', paras)
      state.currentLabel = state.globalDataLabels[paras.component][paras.label]
      if (paras.component !== 'data') {
        state.globalDataLabels[paras.component].splice(paras.label, 1)
      }
    },
    drop (state, paras) {
      paras.event.preventDefault()
      if (paras.component !== 'data') {
        state.globalDataLabels[paras.component].push({
          name: state.currentLabel.name,
          type: state.currentLabel.type
        })
        // deepcopy
        state.currentLabel = {}
        if (paras.component === 'dimension') {
          state.globalDataLabels.dimension[state.globalDataLabels.dimension.length - 1].label = state.dimensionLabels[paras.index]
        } else {
          state.globalDataLabels[paras.component][state.globalDataLabels[paras.component].length - 1].label = undefined
        }
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
        if (state.globalData.length !== 0) {
          // console.log(state.globalData)
          // let _keys = state.globalData[0].keys()
          let _keys = Object.keys(state.globalData[0])
          for (let i = 0; i < _keys.length; i++) {
            let item = {
              name: _keys[i],
              type: typeof state.globalData[0][_keys[i]]
            }
            state.globalDataLabels.data.push(item)
            // state.constDataLabels.push(item)
            // state.globalKeys.push(item)
          }
        }
        let {dimensions, measures} = context.getters.originLabels
        state.valueSet = dimensionValueSet({rawData: res, dimensions: dimensions.concat(measures)})
      })
    }
  }
})

export {store}

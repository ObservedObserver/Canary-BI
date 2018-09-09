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
import transpose from './util/transposition.js'
import createMatrix from './util/initMatrix.js'
import getValue from './util/getvalue.js'
// import Core from 'bi-dataset'
Vue.use(Vuex)
// const StatFuncs = {
//   'Sum': sum,
//   'Count': count,
//   'Mean': average,
//   'Median': median
// }
function getInitState (oldState = []) {
  let newState = {
    currentAPI: 'http://localhost:2018/api/data/titanic',
    globalData: [],
    globalDataLabels: {
      filter: [],
      data: [],
      X: [],
      Y: [],
      value: [],
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
  }
  oldState.forEach((key) => {
    delete newState[key]
  })
  return newState
}
var store = new Vuex.Store({
  state: getInitState(),
  getters: {
    originLabels (state) {
      let {dimensions, measures} = transLabel({xlabels: state.globalDataLabels.data})
      return {dimensions, measures}
    },
    biLabels (state) {
      // let {dimensions, measures} = transLabel({xlabels: state.globalDataLabels.X, ylabels: state.globalDataLabels.Y})
      let rows = state.globalDataLabels.X.map(val => val.name)
      let columns = state.globalDataLabels.Y.map(val => val.name)
      let measures = state.globalDataLabels.value.map(val => val.name)
      let dimensions = rows.concat(columns)
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
    },
    pivotData (state, getters) {
      let rows = state.globalDataLabels.X.map(val => val.name)
      let columns = state.globalDataLabels.Y.map(val => val.name)
      let measures = state.globalDataLabels.value.map(val => val.name)
      let ans = []
      if ((rows.length > 0) && (columns.length > 0)) {
        let rowTree = dataTree({rawData: getters.viewData, dimensions: rows})
        let columnTree = dataTree({rawData: getters.viewData, dimensions: columns})
        // console.log(columnTree, tree2Matrix({tree: columnTree}))
        let valueTree = dataTree({rawData: getters.viewData, dimensions: rows.concat(columns), measures, statFunc: state.pickedFunc})
        // console.log(valueTree)
        let rowMatrix = tree2Matrix({tree: rowTree})
        let originColumnMatrix = tree2Matrix({tree: columnTree})
        for (let rarr of rowMatrix) {
          for (let carr of originColumnMatrix) {
            let r = rarr.toString()
            let c = carr.toString()
            ans.push({
              row: r,
              column: c,
              value: parseFloat(getValue(valueTree, 0, rarr.concat(carr))) || 0
            })
          }
        }
      }
      return ans
    },
    pivotTable (state, getters) {
      let rows = state.globalDataLabels.X.map(val => val.name)
      let columns = state.globalDataLabels.Y.map(val => val.name)
      let measures = state.globalDataLabels.value.map(val => val.name)
      let ans = [[]]
      if ((rows.length > 0) ^ (columns.length > 0)) {
        return getters.biMatrix
      } else if ((rows.length > 0) && (columns.length > 0)) {
        // let values = state.globalDataLabels.value
        ans = []
        let rowTree = dataTree({rawData: getters.viewData, dimensions: rows})
        let columnTree = dataTree({rawData: getters.viewData, dimensions: columns})
        // console.log(columnTree, tree2Matrix({tree: columnTree}))
        let valueTree = dataTree({rawData: getters.viewData, dimensions: rows.concat(columns), measures, statFunc: state.pickedFunc})
        // console.log(valueTree)
        let rowMatrix = tree2Matrix({tree: rowTree})
        let originColumnMatrix = tree2Matrix({tree: columnTree})
        let columnMatrix = transpose(originColumnMatrix)
        // console.log(rowMatrix, columnMatrix)
        let emptyMatrix = createMatrix(rowMatrix[0].length, columnMatrix.length, () => '')
        let valueMatrix = createMatrix(columnMatrix[0].length, rowMatrix.length, (r, c) => {
          // console.log(rowMatrix[r].concat(transpose(columnMatrix[c])))
          return getValue(valueTree, 0, rowMatrix[r].concat(originColumnMatrix[c]))
        })
        // console.info(emptyMatrix, valueMatrix, rowMatrix, columnMatrix)
        columnMatrix.forEach((row, index, arr) => {
          // console.log('emptyMatrix', emptyMatrix[index])
          ans.push(emptyMatrix[index].concat(row || []))
        })
        // console.log("ans", ans)
        rowMatrix.forEach((row, index, arr) => {
          ans.push(row.concat(valueMatrix[index] || []))
        })
      }
      return ans
    }
  },
  mutations: {
    initState (state, keptKeys) {
      let newState = getInitState(keptKeys)
      for (let key in state) {
        if (typeof newState[key] !== 'undefined') {
          state[key] = newState[key]
        }
      }
    },
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
    },
    setCurrentAPI (state, api) {
      state.currentAPI = api
    }
  },
  actions: {
    getMainData (context) {
      var state = context.state
      API.getMainData(state.currentAPI, (res) => {
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

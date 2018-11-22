import { dataDrop } from '../util/drop.js'
import { dimensionValueSet } from 'bi-dataset/main.js'
import { getInitState } from '../state/init.js'
const mutitations = {
  initState (state, keptKeys) {
    let newState = getInitState(keptKeys)
    for (let key in state) {
      if (typeof newState[key] !== 'undefined') {
        state[key] = newState[key]
      }
    }
  },
  // 定义字段类型
  setFieldsType (state, val) {
    state.globalDataLabels.data = val
    let dimensions = []
    let measures = []
    // 将data中的数据标签分类为维度标签和度量标签
    state.globalDataLabels.data.forEach(item => {
      if (item.type === 'string') {
        dimensions.push(item)
        state.globalData.forEach(record => {
          try {
            record[item.name] = record[item.name].toString()
          } catch (error) {
            record[item.name] = ''
          }
        })
      } else if (item.type === 'number') {
        measures.push(item)
        state.globalData.forEach(record => {
          record[item.name] = Number(record[item.name]) || 0
        })
      }
    })
    // 更新全局可用的维度标签与度量标签
    state.globalDataLabels.dimensions = dimensions
    state.globalDataLabels.measures = measures
    // 对全局数据（维度）进行维度成员统计，自主分析部分的树状交互需要用到该数据
    state.valueSet = dimensionValueSet({ rawData: state.globalData, dimensions: dimensions.concat(measures).map(item => item.name) })
  },
  setDataLabels (state, {dimensions, measures}) {
    let data = []
    data = data.concat(dimensions.map((val) => {
      return {
        name: val,
        type: 'string'
      }
    }))
    data = data.concat(measures.map((val) => {
      return {
        name: val,
        type: 'number'
      }
    }))
    state.dataConfig.data = data
    state.dataConfig.dimensions = dimensions
    state.dataConfig.measures = measures
  },
  drag (state, { component, label }) {
    state.currentLabel = state.globalDataLabels[component][label]
    if (component !== 'dimensions' && component !== 'measures' && component !== 'time') {
      state.globalDataLabels[component].splice(label, 1)
    }
  },
  drop (state, { ev, component }) {
    ev.preventDefault()
    dataDrop(state, component)
    state.currentLabel = {}
  },
  changeFilter (state, params) {
    state.filters = [...params]
  },
  changeFunc (state, para) {
    // para = 'Sum'
    state.pickedFunc = para
  },
  changeAggregation (state, status) {
    state.dataAggregation = status
  },
  saveChart (state, option) {
    let defaultY = Math.max(...state.dashBoard.map(item => item.y), 0) + 1
    let defaultX = 0
    let defaultW = 12
    let defaultH = 1
    state.dashBoard.push({
      x: defaultX,
      y: defaultY,
      w: defaultW,
      h: defaultH,
      i: (state.dashBoard.length + 1).toString(),
      option
    })
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
}

export default mutitations

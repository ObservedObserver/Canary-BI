import { dataDrop } from '../util/drop.js'
import { dimensionValueSet } from 'bi-dataset/main.js'
import { getInitState } from '../state/init.js'
import DataSource from '../model/dataSource.js'
import FileDB from '../model/fileDB.js'
import MysqlDB from '../model/mysqlDB.js'
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
  },
  setDefaultDataSource (state, index) {
    let dbObj = state.database.dataSource[index].foreignDB
    if (dbObj !== null) {
      state.DefaultDataSource = index
      state.globalDataLabels = {
        filter: [],
        data: [],
        X: [],
        Y: [],
        value: [],
        dimensions: [],
        measures: [],
        time: [],
        color: [],
        shape: [],
        size: [],
        opacity: []
      }
      state.globalDataLabels.dimensions = dbObj.dimensions.map(item => {
        return { type: 'string', name: item }
      })
      state.globalDataLabels.measures = dbObj.measures.map(item => {
        return { type: 'number', name: item }
      })
      state.globalDataLabels.data = state.globalDataLabels.dimensions.concat(state.globalDataLabels.measures)
    } else {
      console.log('WARNING: have not set dataSource correctly')
    }
  },
  createDataSource (state) {
    let dsObj = new DataSource()
    state.database.dataSource.push(dsObj)
  },
  updateDataSource (state, props) {
    const {dsIndex, value} = props
    state.database.dataSource[dsIndex].updateValue(value)
  },
  createLocalFile (state, {file, dsIndex}) {
    let FileObj = new FileDB({fileName: 'test', file})
    // await FileObj.loadData()
    state.database.fileDB.push(FileObj)
    state.database.dataSource[dsIndex].foreignDB = FileObj
  },
  updateLocalFile (state, {file, dsIndex}) {
    let FileObj = state.database.dataSource[dsIndex].foreignDB
    if (FileObj !== null) {
      FileObj.updateValue({file})
    }
  },
  createMySQL (state, {dsIndex, config}) {
    let mysqlObj = new MysqlDB({config})
    state.database.mysql.push(mysqlObj)
    state.database.dataSource[dsIndex].foreignDB = mysqlObj
  },
  updateMySQL (state, {dsIndex, config}) {
    let mysqlObj = state.database.dataSource[dsIndex].foreignDB
    if (mysqlObj !== null) {
      mysqlObj.updateConfig({config})
    }
  },
  updateSQLDataView (state, {dsIndex, dataView}) {
    let mysqlObj = state.database.dataSource[dsIndex].foreignDB
    if (mysqlObj !== null) {
      mysqlObj.updateDataView({dataView})
    }
  },
  changeMySQLMode (state, {dsIndex, mode}) {
    let mysqlObj = state.database.dataSource[dsIndex].foreignDB
    if (mysqlObj !== null) {
      mysqlObj.changeMode({mode})
    }
  }
}

export default mutitations

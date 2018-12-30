import { dataDrop } from '../util/drop.js'
import { dimensionValueSet } from 'bi-dataset/main.js'
import { getInitState } from '../state/init.js'
import DataSource from '../model/dataSource.js'
import FileDB from '../model/fileDB.js'
import MysqlDB from '../model/mysqlDB.js'
import RestDB from '../model/restDB.js'
import DashBoard from '../model/dashboard/index'
import Segment from '../model/dashboard/segment'
import Container from '../model/dashboard/container'
import Chart from '../model/chart'
import Field from '../model/field'
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
      if (item.isDimension()) {
        dimensions.push(item)
        state.globalData.forEach(record => {
          try {
            record[item.name] = record[item.name].toString()
          } catch (error) {
            record[item.name] = ''
          }
        })
      } else if (item.isMeasure()) {
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
  setDBFields (state, {dsIndex, fieldsType}) {
    let db = state.database.dataSource[dsIndex].foreignDB
    if (db !== null) {
      db.setFieldsType(fieldsType)
    }
  },
  setDataLabels (state, {dimensions, measures}) {
    let data = []
    data = data.concat(dimensions.map((val) => {
      return new Field({name: val}).setDimension()
    }))
    data = data.concat(measures.map((val) => {
      return new Field({name: val}).setMeaure()
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
    state.globalDataLabels.filters = [...params]
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
      state.defaultDataSource = index
      state.globalDataLabels = {
        filters: [],
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
      state.globalData = dbObj.dataSource
      state.globalDataLabels.dimensions = dbObj.dimensions.map(item => {
        return new Field({name: item}).setDimension()
      })
      state.globalDataLabels.measures = dbObj.measures.map(item => {
        return new Field({name: item}).setMeasure()
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
  deleteDataSource (state, {dsIndex}) {
    if (dsIndex > -1 && dsIndex < state.database.dataSource.length) {
      state.database.dataSource = state.database.dataSource.splice(dsIndex, 1)
    }
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
  },
  createRest (state, {dsIndex, api}) {
    let restObj = new RestDB(api)
    state.database.rest.push(restObj)
    state.database.dataSource[dsIndex].foreignDB = restObj
  },
  updateRest (state, {dsIndex, api}) {
    let restObj = state.database.dataSource[dsIndex].foreignDB
    if (restObj !== null) {
      restObj.updateValue(api)
    }
  },
  addDashBoard (state, props) {
    let board = new DashBoard(props)
    state.dashBoardList.push(board)
  },
  addSegment (state, {boardIndex, chartIndex, dsIndex}) {
    let container = new Container()
    let chart = state.chartWarehouse[chartIndex]
    let dataSource = state.database.dataSource[dsIndex]
    let seg = new Segment({
      dataSource,
      chart,
      container
    })
    state.dashBoardList[boardIndex].append(seg)
  },
  addChart (state, props) {
    let chart = new Chart(props)
    state.chartWarehouse.push(chart)
  },
  updateDashBoardContainer (state, {boardIndex, containerList}) {
    console.log('container list', containerList)
    // 1. 不严格，应做container.i的匹配
    // 2. 应调用update方法
    containerList.forEach((container, index) => {
      let target = state.dashBoardList[boardIndex].segmentList.find(item => {
        return item.container.i === container.i
      })
      if (typeof target !== 'undefined') {
        target.container.updateValue(container)
      }
    })
  }
}

export default mutitations

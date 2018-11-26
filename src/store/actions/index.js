import { API } from '@/store/service/api.js'
const actions = {
  getMainData (context) {
    var state = context.state
    API.getMainData(state.currentAPI, (res) => {
      state.globalData = res.dataSource
      state.dataConfig.dimensions = res.config.Dimensions
      state.dataConfig.measures = res.config.Measures
      state.globalDataLabels.data = res.config.Dimensions.map((val) => {
        return {
          name: val,
          type: 'string'
        }
      })
      state.globalDataLabels.data = state.globalDataLabels.data.concat(res.config.Measures.map((val) => {
        return {
          name: val,
          type: 'number'
        }
      }))
    })
  },
  connectMySQL (context, config) {
    let state = context.state
    state.mysql.config = config
    API.connectMySQL(config, (res) => {
      console.log('mysql:', res)
      if (res.success) {
        state.mysql.databases = res.result
      } else {
        state.mysql.databases = []
      }
    })
  },
  queryTableData (context, {config, sql}) {
    let state = context.state
    API.sqlQuery({config, sql}, (res) => {
      console.log('sqlQuery', res)
      if (res.success) {
        state.globalData = res.result
        let dataSource = res.result
        if (dataSource.length > 0) {
          let keys = Object.keys(dataSource[0])
          context.state.globalDataLabels.data = keys.map((key) => {
            return {
              type: typeof dataSource[0][key],
              name: key
            }
          })
          context.state.globalDataLabels.dimensions = context.state.globalDataLabels.data.filter(label => {
            return label.type === 'string'
          })
          context.state.globalDataLabels.measures = context.state.globalDataLabels.data.filter(label => {
            return label.type === 'number'
          })
        }
      } else {
        state.mysql.tables = []
      }
    })
  },
  getTableFromDB (context, {config, sql}) {
    let state = context.state
    API.sqlQuery({config, sql}, (res) => {
      console.log('sqlQuery', res)
      let tableList = res.result.map(item => {
        return {tableName: item[`Tables_in_${config.database.toLowerCase()}`], keys: []}
      })
      if (res.success) {
        state.mysql.tables = tableList
        tableList.forEach(table => {
          API.sqlQuery({config, sql: `DESC ${table.tableName}`}, (res2) => {
            if (res2.success) {
              table.keys = res2.result
            } else {
              table.keys = []
            }
          })
        })
      } else {
        state.mysql.tables = []
      }
    })
  },
  async importUploadData (context, {dsIndex}) {
    let state = context.state
    // 创建文件实例，加载数据，并将其存储在database中
    // let FileObj = new FileDB({fileName: 'test', file})
    // await FileObj.loadData()
    // state.database.fileDB.push(FileObj)
    // // 创建数据源实例，并设置数据源实例的外键为刚刚创建的文件实例
    // let dsObj = new DataSource({type: 'localfile', title})
    // dsObj.linkDB(FileObj)
    // state.database.dataSource.push(dsObj)
    // // 更新全局状态数据，可对这部分再封装以便其他模块共享
    let fileObj = state.database.dataSource[dsIndex].foreignDB
    await fileObj.loadData()
    state.globalData = fileObj.dataSource
    state.globalDataLabels.dimensions = fileObj.dimensions.map(item => {
      return { type: 'string', name: item }
    })
    state.globalDataLabels.measures = fileObj.measures.map(item => {
      return { type: 'number', name: item }
    })
    state.globalDataLabels.data = state.globalDataLabels.dimensions.concat(state.globalDataLabels.measures)
  },
  async loadFileData (context, {dsIndex}) {
    let state = context.state
    // 创建文件实例，加载数据，并将其存储在database中
    // let FileObj = new FileDB({fileName: 'test', file})
    // await FileObj.loadData()
    // state.database.fileDB.push(FileObj)
    // // 创建数据源实例，并设置数据源实例的外键为刚刚创建的文件实例
    // let dsObj = new DataSource({type: 'localfile', title})
    // dsObj.linkDB(FileObj)
    // state.database.dataSource.push(dsObj)
    // // 更新全局状态数据，可对这部分再封装以便其他模块共享
    let fileObj = state.database.dataSource[dsIndex].foreignDB
    await fileObj.loadData()
    // state.globalData = fileObj.dataSource
    // state.globalDataLabels.dimensions = fileObj.dimensions.map(item => {
    //   return { type: 'string', name: item }
    // })
    // state.globalDataLabels.measures = fileObj.measures.map(item => {
    //   return { type: 'number', name: item }
    // })
    // state.globalDataLabels.data = state.globalDataLabels.dimensions.concat(state.globalDataLabels.measures)
  },
  async getDatabases (context, {dsIndex}) {
    let state = context.state
    let mysqlObj = state.database.dataSource[dsIndex].foreignDB
    await mysqlObj.getDatabases()
  },
  async getTables (context, {dsIndex}) {
    let state = context.state
    let mysqlObj = state.database.dataSource[dsIndex].foreignDB
    await mysqlObj.getTables()
  },
  async getSQLData (context, {dsIndex}) {
    let state = context.state
    let mysqlObj = state.database.dataSource[dsIndex].foreignDB
    await mysqlObj.getData()
  },
  async getRestData (context, {dsIndex}) {
    let state = context.state
    let restObj = state.database.dataSource[dsIndex].foreignDB
    await restObj.getData()
  }
}

export default actions

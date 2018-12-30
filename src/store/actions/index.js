const actions = {
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

import Service from './service.js'
import router from '@/router/index.js'
import { Message, Loading } from 'element-ui'
const loadingOption = {
  lock: true,
  text: '加载数据中'
}
const actions = {
  async login (context, userInfo) {
    try {
      let res = await Service.login(userInfo)
      let result = await res.json()
      if (result.success) {
        Message.success({
          showClose: true,
          message: '登录成功'
        })
        router.push('/analysis')
      } else {
        Message.error({
          showClose: true,
          message: '[登录失败]' + result.data
        })
      }
    } catch (error) {
      Message.error({
        showClose: true,
        message: '[登录失败]' + error
      })
    }
  },
  async register (context, userInfo) {
    try {
      let res = await Service.register(userInfo)
      let result = await res.json()
      if (result.success) {
        Message.success({
          showClose: true,
          message: '注册成功，请登录'
        })
        router.push('/access')
      } else {
        Message.error({
          showClose: true,
          message: '[注册失败]' + result.data
        })
      }
    } catch (error) {
      Message.error({
        showClose: true,
        message: '[注册失败]' + error
      })
    }
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
    let loadingInstance = Loading.service(loadingOption)
    try {
      await mysqlObj.getDatabases()
      loadingInstance.close()
    } catch (error) {
      loadingInstance.close()
      Message.error({
        showClose: true,
        message: '[获取数据失败]' + error
      })
    }
  },
  async getTables (context, {dsIndex}) {
    let state = context.state
    let mysqlObj = state.database.dataSource[dsIndex].foreignDB
    let loadingInstance = Loading.service(loadingOption)
    try {
      await mysqlObj.getTables()
      loadingInstance.close()
    } catch (error) {
      loadingInstance.close()
      Message.error({
        showClose: true,
        message: '[获取数据失败]' + error
      })
    }
  },
  async getSQLData (context, {dsIndex}) {
    let state = context.state
    let mysqlObj = state.database.dataSource[dsIndex].foreignDB
    let loadingInstance = Loading.service(loadingOption)
    try {
      await mysqlObj.getData()
      loadingInstance.close()
    } catch (error) {
      loadingInstance.close()
      Message.error({
        showClose: true,
        message: '[获取数据失败]' + error
      })
    }
  },
  async getRestData (context, {dsIndex}) {
    let state = context.state
    let restObj = state.database.dataSource[dsIndex].foreignDB
    let loadingInstance = Loading.service(loadingOption)
    try {
      await restObj.getData()
      loadingInstance.close()
    } catch (error) {
      loadingInstance.close()
      Message.error({
        showClose: true,
        message: '[获取数据失败]' + error
      })
    }
  },
  async getDashBoardData (context, {boardIndex}) {
    let state = context.state
    let dsSet = new Set()
    state.dashBoardList[boardIndex].segmentList.forEach((segment) => {
      dsSet.add(segment.chart.dsIndex)
    })
    for (let dsIndex of dsSet.values()) {
      let db = state.database.dataSource[dsIndex].foreignDB
      try {
        await db.getData()
      } catch (error) {
        Message.error({
          showClose: true,
          message: '[获取数据失败]' + error
        })
      }
    }
  }
}

export default actions

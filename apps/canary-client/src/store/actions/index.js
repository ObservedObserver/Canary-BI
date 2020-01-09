import Service from './service.js'
import router from '@/router/index.js'
import { Message, Loading } from 'element-ui'
import DataSource from '../model/dataSource.js'
import FileDB from '../model/fileDB.js'
import MysqlDB from '../model/mysqlDB.js'
import RestDB from '../model/restDB.js'
const createDB = [FileDB, RestDB, MysqlDB]
const loadingOption = {
  lock: true,
  text: '加载数据中'
}
const actions = {
  async login ({state, dispatch}, userInfo) {
    try {
      let res = await Service.login(userInfo)
      let result = await res.json()
      if (result.success) {
        Message.success({
          showClose: true,
          message: '登录成功'
        })
        router.push('/analysis')
        await dispatch('getInitData')
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
  async getInitData ({state, commit}) {
    try {
      let res = await Service.getInitData()
      let result = await res.json()
      if (result.success) {
        const {dataSource, dashBoardList} = result.data
        state.database.dataSource = dataSource.map(item => {
          let db = item.foreignDB
          let ds = new DataSource(item)
          let foreignDB = new createDB[ds.type](db)
          ds.linkDB(foreignDB)
          return ds
        })
        commit('transformDashBoardData', {dashBoardList})
        // 先生成chartWarehouse然后在使用id将这些图标重新引用到DashBoard中
        let chartMap = new Map()
        state.dashBoardList.forEach(board => {
          board.segmentList.forEach(segment => {
            let {chart} = segment
            if (!chartMap.has(chart.id)) {
              chartMap.set(chart.id, chart)
            }
          })
        })
        console.log('chartMap', chartMap)
        state.chartWarehouse = [...chartMap.values()]
      }
      Message.success({
        showClose: true,
        message: '获取数据源成功'
      })
    } catch (error) {
      console.log(error)
    }
  },
  async addDataSource ({state, dispatch}, {dsIndex}) {
    try {
      let res = await Service.addDataSource(state.database.dataSource[dsIndex])
      let result = await res.json()
      if (result.success) {
        const { id } = result.data
        state.database.dataSource[dsIndex].id = id
      }
    } catch (error) {
      console.log(error)
    }
  },
  async updateDataSource ({state}, {dsIndex}) {
    try {
      let res = await Service.updateDataSource(state.database.dataSource[dsIndex])
      let result = await res.json()
      if (result.success) {
        // 理论上建议getDataSource来保证数据的一致性
        console.log('update success')
      }
    } catch (error) {
      console.log(error)
    }
  },
  async deleteDataSource ({state, commit}, {dsIndex}) {
    try {
      let res = await Service.deleteDataSource(state.database.dataSource[dsIndex])
      let result = await res.json()
      if (result.success) {
        // 理论上建议getDataSource来保证数据的一致性
        console.log('delete success')
        commit('deleteDataSource', {dsIndex})
      }
    } catch (error) {
      console.log(error)
    }
  },
  async addChart ({state, commit}, props) {
    try {
      commit('addChart', props)
      let chartIndex = state.chartWarehouse.length - 1
      let res = await Service.addChart(state.chartWarehouse[chartIndex])
      let result = await res.json()
      if (result.success) {
        // 理论上建议getDataSource来保证数据的一致性
        console.log('add success')
        state.chartWarehouse[chartIndex].id = result.data.id
      }
    } catch (error) {
      console.log(error)
    }
  },
  async addDashBoard ({state, commit}, props) {
    try {
      commit('addDashBoard', props)
      let boardIndex = state.dashBoardList.length - 1
      let res = await Service.addDashBoard(state.dashBoardList[boardIndex])
      let result = await res.json()
      if (result.success) {
        // 理论上建议getDataSource来保证数据的一致性
        console.log('add success')
        state.dashBoardList[boardIndex].id = result.data.id
      }
    } catch (error) {
      console.log(error)
    }
  },
  async updateDashBoard ({state}, {boardIndex}) {
    try {
      let res = await Service.updateDashBoard(state.dashBoardList[boardIndex])
      let result = await res.json()
      if (result.success) {
        // 理论上建议getDataSource来保证数据的一致性
        console.log('update success')
      }
    } catch (error) {
      console.log(error)
    }
  },
  async deleteDashBoard ({state, commit}, {boardIndex}) {
    try {
      let res = await Service.deleteDashBoard(state.dashBoardList[boardIndex])
      let result = await res.json()
      if (result.success) {
        // 理论上建议getDataSource来保证数据的一致性
        console.log('delete success')
        commit('deleteDashBoard', {boardIndex})
      }
    } catch (error) {
      console.log(error)
    }
  },
  async getDashBoardList ({state, commit}, {boardIndex}) {
    try {
      let res = await Service.getDashBoard(state.dashBoardList[boardIndex])
      let result = await res.json()
      if (result.success) {
        // 理论上建议getDataSource来保证数据的一致性
        console.log('get success')
      }
    } catch (error) {
      console.log(error)
    }
  },
  async loadFileData ({state, dispatch}, {dsIndex}) {
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
    let id = state.database.dataSource[dsIndex].id
    await fileObj.loadData()
    if (id === null) {
      await dispatch('addDataSource', {dsIndex})
    } else {
      await dispatch('updateDataSource', {dsIndex})
    }
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
  async getSQLData ({state, dispatch}, {dsIndex}) {
    let mysqlObj = state.database.dataSource[dsIndex].foreignDB
    let loadingInstance = Loading.service(loadingOption)
    try {
      await mysqlObj.getData()
      let id = state.database.dataSource[dsIndex].id
      if (id === null) {
        await dispatch('addDataSource', {dsIndex})
      } else {
        await dispatch('updateDataSource', {dsIndex})
      }
      loadingInstance.close()
    } catch (error) {
      loadingInstance.close()
      Message.error({
        showClose: true,
        message: '[获取数据失败]' + error
      })
    }
  },
  async getRestData ({state, dispatch}, {dsIndex}) {
    let restObj = state.database.dataSource[dsIndex].foreignDB
    let loadingInstance = Loading.service(loadingOption)
    try {
      await restObj.getData()
      loadingInstance.close()
      let id = state.database.dataSource[dsIndex].id
      if (id === null) {
        await dispatch('addDataSource', {dsIndex})
      } else {
        await dispatch('updateDataSource', {dsIndex})
      }
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

// import DashBoard from '../model/dashboard/index'
import DataLabels from '../model/dataLabels'
function getInitState (oldState = []) {
  let newState = {
    currentAPI: 'http://localhost:2018/api/data/titanic',
    database: {
      dataSource: [],
      fileDB: [],
      mysql: [],
      rest: []
    },
    dashBoardList: [],
    chartWarehouse: [],
    dataSourceList: [],
    defaultDataSource: 0,
    currentDashboard: 0,
    globalData: [],
    dataConfig: {
      dimensions: [],
      measures: []
    },
    globalDataLabels: new DataLabels(),
    currentLabel: {},
    dataAggregation: true,
    filters: [],
    func: ['sum', 'average', 'count'],
    pickedFunc: 'sum',
    valueSet: {},
    dashBoard: [],
    page: {
      primary: 'Main',
      secondary: 0
    }
  }
  oldState.forEach((key) => {
    delete newState[key]
  })
  return newState
}

export { getInitState }

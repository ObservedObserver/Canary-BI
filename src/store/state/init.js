function getInitState (oldState = []) {
  let newState = {
    currentAPI: 'http://localhost:2018/api/data/titanic',
    database: {
      dataSource: [],
      fileDB: []
    },
    dataSourceList: [],
    defaultDataSource: 0,
    globalData: [],
    dataConfig: {
      dimensions: [],
      measures: []
    },
    globalDataLabels: {
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
    },
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
    },
    mysql: {
      config: {},
      databases: [],
      tables: []
    }
  }
  oldState.forEach((key) => {
    delete newState[key]
  })
  return newState
}

function addNewDataSource () {
  return {
    currentAPI: '',
    description: {
      title: '',
      colNum: '',
      type: '',
      size: ''
    },
    rawData: [],
    dataConfig: {
      dimensions: [],
      measures: []
    },
    globalDataLabels: {
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
    },
    currentLabel: {},
    dataAggregation: true,
    filters: [],
    func: ['sum', 'average', 'count'],
    pickedFunc: 'sum',
    valueSet: {},
    dashBoard: [],
    mysql: {
      config: {},
      databases: [],
      tables: []
    }
  }
}

export { getInitState, addNewDataSource }

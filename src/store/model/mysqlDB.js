import Config from '@/config/index.js'
function sqlQuery (query) {
  return fetch(Config.server.sql, {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
class MysqlDB {
  constructor (props) {
    const {config} = props
    this.config = config
    this.dataView = []
    this.databases = []
    this.tables = []
    this.dataSource = []
    this.mode = 'union'
    this.dimensions = []
    this.measures = []
    // this.choosenTable = ''
  }
  changeMode (props) {
    const {mode} = props
    if (mode !== this.mode) {
      this.mode = mode
      this.dataView = []
      this.dataSource = []
    }
  }
  updateConfig (props) {
    const {config} = props
    this.config = config
    this.dataView = []
    this.databases = []
    this.tables = []
    this.dataSource = []
    this.mode = 'union'
    this.dimensions = []
    this.measures = []
  }
  updateDataView (props) {
    const {dataView} = props
    this.dataView = dataView
    this.dataSource = []
    this.dimensions = []
    this.measures = []
  }
  async getDatabases () {
    let resRaw = await sqlQuery({config: this.config, sql: 'SHOW DATABASES;'})
    let res = await resRaw.json()
    if (res.success) {
      this.databases = res.result
    } else {
      this.databases = []
    }
  }
  async getTables () {
    let config = this.config
    let resRaw = await sqlQuery({config, sql: 'SHOW TABLES;'})
    let res = await resRaw.json()
    if (res.success) {
      this.tables = res.result.map(item => {
        return {tableName: item[`Tables_in_${config.database.toLowerCase()}`], fields: []}
      })
      for (let i = 0; i < this.tables.length; i++) {
        let table = this.tables[i]
        let resRawFields = await sqlQuery({config: this.config, sql: `DESC ${table.tableName};`})
        let resFields = await resRawFields.json()
        if (resFields.success) {
          table.fields = resFields.result
        } else {
          table.fields = []
        }
      }
    } else {
      this.tables = []
    }
  }
  async getData () {
    let sql = this.getSQL()
    let resRaw = await sqlQuery({config: this.config, sql})
    let res = await resRaw.json()
    if (res.success) {
      this.dataSource = res.result
      this.setFieldsType()
    } else {
      this.dataSource = []
    }
  }
  getSQL () {
    let sql = ''
    if (this.mode === 'union') {
      let viewList = this.dataView.map(view => {
        return `SELECT * FROM ${view.table}`
      })
      sql = viewList.join(' UNION ') + ';'
    } else {
      sql = 'SELECT * from'
      this.dataView.forEach((view, index) => {
        if (index === 0) {
          sql += ` ${view.left.table} ${view.relation} JOIN ${view.right.table} ON ${view.left.table}.${view.left.key} = ${view.right.table}.${view.right.key}`
        } else {
          sql += ` ${view.relation} JOIN ${view.right.table} ON ${view.left.table}.${view.left.key} = ${view.right.table}.${view.right.key}`
        }
      })
      sql += ';'
    }
    return sql
  }
  setFieldsType (typeList) {
    this.dimensions = []
    this.measures = []
    if (typeof typeList === 'undefined') {
      let sample = this.dataSource[0]
      for (let key in sample) {
        if (typeof sample[key] === 'string') {
          this.dimensions.push(key)
        } else {
          this.measures.push(key)
        }
      }
    } else {
      typeList.forEach(item => {
        if (item.isTime()) {
          this.dimensions.push(item.name)
          this.dataSource.forEach(row => {
            row[item.name] = row[item.name].replace(/[A-Z]/g, ' ').replace(/[.].+/, '').replace(/[ ]$/, '')
          })
        } else if (item.isDimension()) {
          this.dimensions.push(item.name)
        } else {
          this.measures.push(item.name)
        }
      })
    }
  }
}

export default MysqlDB

function sqlQuery (query) {
  return fetch('http://localhost:1999/mysql/query', {
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
    const {id, config, sql} = props
    this.id = id
    this.config = config
    this.sql = sql
  }
  async queryData () {
    let res = await sqlQuery({config: this.config, sql: this.sql})
    let result = await res.json()
    this.dataSource = result
  }
  setFieldsType (typeList) {
    this.dimensions = []
    this.measures = []
    if (typeof typeList === 'undefined') {
      let sample = this.dataSource[0]
      for (let key in sample) {
        if (typeof sample[key] === 'number') {
          this.dimensions.push(key)
        } else {
          this.measures.push(key)
        }
      }
    }
  }
}

export default MysqlDB

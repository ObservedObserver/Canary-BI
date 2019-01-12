function fetchRestData (api) {
  return fetch(api, { method: 'GET' })
}
class RestDB {
  constructor (props) {
    const {host = '', port = '', service = ''} = props
    this.host = host
    this.port = port
    this.service = service
    this.dimensions = []
    this.measures = []
    this.dataSource = []
  }
  updateValue (props) {
    const {host = '', port = '', service = ''} = props
    this.host = host
    this.port = port
    this.service = service
    this.dimensions = []
    this.measures = []
    this.dataSource = []
  }
  async getData () {
    const {host, port, service} = this
    let res = await fetchRestData(`//${host}:${port}${service}`)
    let result = await res.json()
    this.dataSource = result.dataSource
    this.dimensions = result.config.Dimensions
    this.measures = result.config.Measures
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

export default RestDB

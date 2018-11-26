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
}

export default RestDB

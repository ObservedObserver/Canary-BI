class DataSource {
  constructor (props) {
    const { title = 'new source', type = 'localfile' } = props
    this.title = title
    this.type = type
  }

  linkDB (db) {
    this.foreignDB = db
  }

  updateValue (config) {
    let settings = Object.keys(config)
    let self = this
    settings.forEach(item => {
      self[item] = config[item]
    })
  }
}

export default DataSource

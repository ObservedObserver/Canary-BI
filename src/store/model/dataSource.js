class DataSource {
  constructor (props = {}) {
    const { title = 'new source', type = 0 } = props
    this.title = title
    this.type = type
    this.foreignDB = null
  }

  linkDB (db) {
    this.foreignDB = db
  }

  updateValue (props) {
    const {
      title = this.title,
      type = this.type,
      foreignDB = this.foreignDB
    } = props
    this.title = title
    this.type = type
    this.foreignDB = foreignDB
  }
}

export default DataSource

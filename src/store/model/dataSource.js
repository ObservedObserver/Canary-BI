class DataSource {
  constructor (props = {}) {
    const { title = 'new source', type = 0, id = null } = props
    this.title = title
    this.type = type
    this.foreignDB = null
    this.id = id
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

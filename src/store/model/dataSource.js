class DataSource {
  constructor (props = {}) {
    const { title = 'new source', type = 0, id = null, foreignDB = null } = props
    this.title = title
    this.type = type
    this.foreignDB = foreignDB
    this.id = id
    // { label: '本地文件', value: 0 },
    // { label: 'Restful API', value: 1 },
    // { label: 'MySQL', value: 2 }
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

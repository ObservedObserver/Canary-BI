import CSV from 'comma-separated-values'
function readFile (file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (ev) => {
      resolve(ev.target.result)
    }
    reader.onerror = reject
  })
}
class FileDB {
  constructor (props) {
    const { file } = props
    this.fileName = file.name
    this.size = file.size
    this.file = file
    this.dataSource = []
    this.dimensions = []
    this.measures = []
    // try {
    //   this.loadData()
    // } catch (error) {
    //   console.log('load localfile data error', error)
    // }
  }
  updateValue (props) {
    const { file } = props
    this.fileName = file.name
    this.size = file.size
    this.file = file
    this.dataSource = []
    this.dimensions = []
    this.measures = []
    // try {
    //   this.loadData()
    // } catch (error) {
    //   console.log('load localfile data error', error)
    // }
  }
  async loadData () {
    let fileNameArr = this.file.name.split('.')
    let fileType = fileNameArr[fileNameArr.length - 1]
    let result = await readFile(this.file)
    switch (fileType) {
      case 'json':
        this.dataSource = JSON.parse(result)
        break
      case 'csv':
        this.dataSource = new CSV(result, { header: true }).parse()
        break
    }
    this.setFieldsType()
  }
  setFieldsType (typeList) {
    this.dimensions = []
    this.measures = []
    if (typeof typeList === 'undefined') {
      if (this.dataSource.length > 0) {
        let sample = this.dataSource[0]
        for (let key in sample) {
          if (typeof sample[key] === 'number') {
            this.measures.push(key)
          } else {
            this.dimensions.push(key)
          }
        }
      }
    }
  }
}

export default FileDB

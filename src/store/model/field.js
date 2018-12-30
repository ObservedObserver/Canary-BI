class Field {
  constructor (props = {}) {
    const {label, name, type} = props
    this.label = label
    this.name = name
    this.type = type
  }
  isDimension () {
    return this.type === 'string'
  }
  isMeasure () {
    return this.type === 'number'
  }
  setDimension () {
    this.type = 'string'
    return this
  }
  setMeasure () {
    this.type = 'number'
    return this
  }
  copy ({name, type}) {
    this.name = name
    this.type = type
    return this
  }
}

export default Field

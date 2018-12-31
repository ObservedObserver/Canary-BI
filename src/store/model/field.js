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
  setMeasure (aggFunc = 'sum') {
    this.type = 'number'
    this.aggFunc = aggFunc
    return this
  }
  copy ({name, type, aggFunc = 'sum'}) {
    this.name = name
    this.type = type
    this.aggFunc = type === 'number' ? aggFunc : undefined
    return this
  }
}

export default Field

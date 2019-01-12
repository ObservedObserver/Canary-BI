class Filter {
  constructor (props = {}) {
    const {name, type, filterType, values} = props
    this.name = name
    this.type = type
    this.values = values
    this.filterType = filterType || (type === 'string' || type === 'time') ? 'equal' : 'range'
    this.range = this.filterType === 'equal' ? values : [Math.min(...this.values), Math.max(...this.values)]
  }
  updateValues (values) {
    this.values = values
  }
  // value是用户选择的值范围，range是初始化的最大值范围
  get value () {
    return this.filterType === 'equal' ? this.values : [Math.min(...this.values), Math.max(...this.values)]
  }
  get valueSet () {
    return this.filterType === 'equal' ? this.values : [Math.min(...this.values), Math.max(...this.values)]
  }
}
export default Filter

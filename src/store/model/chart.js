class Chart {
  constructor (props = {}) {
    const {
      rows = [],
      cols = [],
      measures = [],
      dimensions = [],
      color,
      opacity,
      size,
      shape,
      type = 0,
      operations = [],
      dsIndex = -1
    } = props
    this.rows = rows
    this.cols = cols
    this.measures = measures
    this.dimensions = dimensions
    this.color = color
    this.opacity = opacity
    this.size = size
    this.shape = shape
    this.type = type
    this.operations = operations
    this.dsIndex = dsIndex
  }
}
export default Chart

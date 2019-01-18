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
      coord = 'rect',
      transpose = false,
      constScale = false,
      operations = [],
      filters = [],
      dsId = null,
      id = null
    } = props
    this.id = id
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
    this.dsId = dsId
    this.filters = filters
    this.coord = coord
    this.transpose = transpose
    this.constScale = constScale
  }
  dsIndex (dataSourceList) {
    return dataSourceList.findIndex(ds => {
      return ds.id === this.dsId
    })
  }
}
export default Chart

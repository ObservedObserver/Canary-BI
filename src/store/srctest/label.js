/**
 * @param {Array} xlabels [array contains label object of x axis]
 * @param {Array} ylabels [array contains label object of y axis]
 * @return {Object} [dimensions and measures]
 */
var labelProcesser = ({xlabels, ylabels}) => {
  let dimensions = []
  let measures = []

  xlabels.forEach((val) => {
    val.type === 'string' ? dimensions.push(val.name) : measures.push(val.name)
  })

  ylabels.forEach((val) => {
    val.type === 'string' ? dimensions.push(val.name) : measures.push(val.name)
  })

  return {dimensions, measures}
}

export default labelProcesser

var dimensionStatistic = (rawData, dimensions) => {
  let result = []
  dimensions.forEach((dim) => {
    let set = new Set()
    rawData.forEach((val) => {
      set.add(val[dim])
    })
    result.push([...set])
  })
  console.log('dimensionStatistic[result]', result)
  if (result.length > 0) {
    result[0] = result[0].map((val) => {
      return [val]
    })
  }
  return result
}

var dimensionMultiply = (dimX, dimY) => {
  let result = []
  for (let dimXItem of dimX) {
    for (let dimYItem of dimY) {
      if (Array.isArray(dimXItem)) {
        result.push([...dimXItem, dimYItem])
      } else {
        result.push([dimXItem, dimYItem])
      }
    }
  }
  return result
}
/**
 * @param {Array} rawData
 * @param {Array} dimensions
 * @param {Array} measures
 * @return {Array} [matrix of mixed dimensions]
 */
var dimensionMixer = ({rawData, dimensions, measures}) => {
  let stat = dimensionStatistic(rawData, dimensions)
  let result = stat[0]
  let lowerstat = dimensionStatistic(rawData, dimensions.slice(1)) //[]
  let lowerresult = lowerstat[0] //undefined
  for (let i = 1; i < stat.length; i++) {
    result = dimensionMultiply(result, stat[i])
  }
  for (let i = 1; i < lowerstat.length; i++) {
    lowerresult = dimensionMultiply(lowerresult, lowerstat[i])
  }
  result.unshift([...dimensions])
  if (typeof lowerresult !== 'undefined') {
    lowerresult.unshift(dimensions.slice(1))
  }
  return {result, stat, lowerresult}
}
export {dimensionStatistic, dimensionMultiply}
export default dimensionMixer

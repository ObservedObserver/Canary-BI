/**
 * @param {Array} rawData
 * @param {Array} mixDim
 * @return {Array} [dataset]
 */
var matrixProducer = ({rawData, mixDim, measures}) => {
  // let _length = mixDim[0].length
  let result = mixDim
  let dimLen = mixDim[0].length
  result[0].push(...measures)
  for (let i = 1; i < mixDim.length; i++) {
    // let pos = rawData.findIndex((item) => {
    //   return mixDim[i].every((val, index) => {
    //     // console.log(val, item[mixDim[0][index]])
    //     return val === item[mixDim[0][index]]
    //   })
    // })
    let items = rawData.filter((item) => {
      return mixDim[i].every((val, index) => {
        return val === item[mixDim[0][index]]
      })
    })
    measures.forEach((meas) => {
      result[i].push(0)
    })
    measures.forEach((meas, index) => {
      items.forEach((item) => {
        result[i][dimLen + index] += item[meas]
      })
    })
    // if (pos !== -1) {
    //   measures.forEach((meas) => {
    //     result[i].push(rawData[pos][meas])
    //   })
    // } else {
    //   measures.forEach((meas) => {
    //     result[i].push('null')
    //   })
    // }
  }
  return result
}
export default matrixProducer

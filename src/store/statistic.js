import {median as arrayMedian} from './median.js'
var sum = ({data, measures}) => {
  // console.log('data in sum is used', data)
  if (typeof data !== 'undefined' && data.length > 0) {
    let result = {}
    measures.forEach((meas) => {
      result[meas] = 0
    })
    data.forEach((item) => {
      measures.forEach((meas) => {
        result[meas] += item[meas]
      })
    })
    // console.log('result in statictic.js[sum]', result)
    return result
  } else {
    return {}
  }
}
var count = ({data, measures}) => {
  // console.log('data in count is used', data)
  if (typeof data !== 'undefined' && data.length > 0) {
    let result = {}
    measures.forEach((meas) => {
      result[meas] = 0
    })
    data.forEach((item) => {
      measures.forEach((meas) => {
        result[meas]++
      })
    })
    // console.log('result in statictic.js[count]', result)
    return result
  } else {
    return {}
  }
}
var average = ({data, measures}) => {
  // console.log('data in average in used', data)
  if (typeof data !== 'undefined' && data.length > 0) {
    let result = {}
    measures.forEach((meas) => {
      result[meas] = [0, 0]
    })
    data.forEach((item) => {
      measures.forEach((meas) => {
        result[meas][0] += item[meas]
        result[meas][1]++
      })
    })
    measures.forEach((meas) => {
      result[meas] = result[meas][0] / result[meas][1]
    })
    // console.log('result in statictic.js[count]', result)
    return result
  } else {
    return {}
  }
}
var median = ({data, measures}) => {
  // console.log('data in average in used', data)
  if (typeof data !== 'undefined' && data.length > 0) {
    let result = {}
    measures.forEach((meas) => {
      result[meas] = []
    })
    data.forEach((item) => {
      measures.forEach((meas) => {
        result[meas].push(item[meas])
      })
    })
    measures.forEach((meas) => {
      result[meas] = arrayMedian(result[meas])
    })
    // console.log('result in statictic.js[count]', result)
    return result
  } else {
    return {}
  }
}
export {sum, count, average, median}

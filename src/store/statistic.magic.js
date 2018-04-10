import {median as arrayMedian} from './median.js'
var sum = ({keys, num, rawData}) => {
  var ans = {}
  for (let k of keys) {
    let dataset = []
    for (let n of num) {
      let smap = new Map()
      smap = new Map()
      rawData.forEach((val) => {
        if (!smap.has(val[k])) {
          smap.set(val[k], 0)
        }
        smap.set(val[k], smap.get(val[k]) + val[n])
      })
      if (dataset.length > 0) {
        let values = [...smap.values()]
        dataset.forEach((items, index, arr) => {
          arr[index].push(values[index])
        })
      } else {
        dataset = [...smap]
      }
    }
    dataset.unshift([k, ...num])
    ans[k] = dataset
  }
  return ans
}

var count = ({key, num, rawData}) => {
  var ans = {}
  for (let k of keys) {
    let dataset = []
    for (let n of num) {
      let smap = new Map()
      smap = new Map()
      rawData.forEach((val) => {
        if (!smap.has(val[k])) {
          smap.set(val[k], 0)
        }
        smap.set(val[k], smap.get(val[k]) + 1)
      })
      if (dataset.length > 0) {
        let values = [...smap.values()]
        dataset.forEach((items, index, arr) => {
          arr[index].push(values[index])
        })
      } else {
        dataset = [...smap]
      }
    }
    dataset.unshift([k, ...num])
    ans[k] = dataset
  }
  return ans
}

var mean = ({key, num, rawData}) => {
  var ans = {}
  for (let k of keys) {
    let dataset = []
    for (let n of num) {
      let mapVal
      let smap = new Map()
      smap = new Map()
      rawData.forEach((val) => {
        if (!smap.has(val[k])) {
          smap.set(val[k], [0, 0])
        }
        mapVal = smap.get(val[k])
        smap.set(val[k], [mapVal[0] + val[n], mapVal[0] ++])
      })
      for (mapKey in smap) {
        mapVal = smap.get(mapKey)
        smap.set(mapKey, [mapVal[0] / mapVal[1]])
      }
      if (dataset.length > 0) {
        let values = [...smap.values()]
        dataset.forEach((items, index, arr) => {
          arr[index].push(values[index])
        })
      } else {
        dataset = [...smap]
      }
    }
    dataset.unshift([k, ...num])
    ans[k] = dataset
  }
  return ans
}

var median = ({key, num, rawData}) => {
  var ans = {}
  for (let k of keys) {
    let dataset = []
    for (let n of num) {
      let mapVal
      let smap = new Map()
      smap = new Map()
      rawData.forEach((val) => {
        if (!smap.has(val[k])) {
          smap.set(val[k], [])
        }
        mapVal = smap.get(val[k])
        mapVal.push(val[n])
        smap.set(val[k], mapVal)
      })
      for (mapKey in smap) {
        mapVal = smap.get(mapKey)
        smap.set(mapKey, arrayMedian(mapVal))
      }
      if (dataset.length > 0) {
        let values = [...smap.values()]
        dataset.forEach((items, index, arr) => {
          arr[index].push(values[index])
        })
      } else {
        dataset = [...smap]
      }
    }
    dataset.unshift([k, ...num])
    ans[k] = dataset
  }
  return ans
}

export {sum, count, mean, median}

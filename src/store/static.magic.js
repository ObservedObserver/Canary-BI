import {median} from './median.js'
var sum = ({key, num, rawData}) => {
  var i, _len, smap
  _len = rawData.length
  smap = new Map()
  rawData.forEach((val) => {
    if (!smap.has(val[key])) {
      smap.set(val[key], 0)
    }
    smap[val[key]] += val[num]
  })
  return [...smap].unshift([key, num])
}

var count = ({key, num, rawData}) => {
  var i, _len, smap
  _len = rawData.length
  smap = new Map()
  rawData.forEach((val) => {
    if (!smap.has(val[key])) {
      smap.set(val[key], 0)
    }
    smap[val[key]] ++
  })
  return [...smap].unshift([key, num])
}

var mean = ({key, num, rawData}) => {
  var i, _len, smap
  _len = rawData.length
  smap = new Map()
  rawData.forEach((val) => {
    if (!smap.has(val[key])) {
      smap.set(val[key], [0, 0])
    }
    smap[val[key]][0] += val[num]
    smap[val[key]][1] ++
  })
  for (let k in smap) {
    smap[k] = smap[k][0] / smap[k][1]
  }
  return [...smap].unshift([key, num])
}

var median = ({key, num, rawData}) => {
  var i, _len, smap
  _len = rawData.length
  smap = new Map()
  rawData.forEach((val) => {
    if (!smap.has(val[key])) {
      smap.set(val[key], [])
    }
    smap[val[key]].push(val[num])
  })
  for (let k in smap) {
    smap[k] = median(smap[k])
  }
  return [...smap].unshift([key, num])
}

export {sum, count, mean, median}

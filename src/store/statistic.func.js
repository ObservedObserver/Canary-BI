import {median as arrayMedian} from './median.js'
var sum = (str, num, transData) => {
  let i, _length, strList, numList
  _length = transData[str].length
  strList = []
  numList = []
  for (i = 0; i < _length; i++) {
    if (strList.indexOf(transData[str][i]) < 0) {
      strList.push(transData[str][i])
      numList.push(transData[num][i])
    } else {
      numList[strList.indexOf(transData[str][i])] += transData[num][i]
    }
  }
  return [strList, numList]
}

var median = (str, num, transData) => {
  let i, _length, strList, numList, numDict
  _length = transData[str].length
  strList = []
  numDict = {}
  numList = []
  for (i = 0; i < _length; i++) {
    if (strList.indexOf(transData[str][i]) < 0) {
      strList.push(transData[str][i])
      numDict[transData[str][i]] = [transData[num][i]]
    } else {
      numDict[transData[str][i]].push(transData[num][i])
    }
  }
  // 对numDict中的每一个键对应的数组求中位数，并用中位数取代该数组
  // console.log(numDict)
  for (i = 0; i < strList.length; i++) {
    // console.log(numDict[strList[i]])
    // console.log(arrayMedian(numDict[strList[i]]))
    // 出现过NaN 与undefined， 加入return arr[left]后消失，需进行严格证明
    numList.push(arrayMedian(numDict[strList[i]]))
  }
  return [strList, numList]
}

var mean = (str, num, transData) => {
  let i, _length, strList, numList, countList
  _length = transData[str].length
  strList = []
  numList = []
  countList = []
  for (i = 0; i < _length; i++) {
    if (strList.indexOf(transData[str][i]) < 0) {
      strList.push(transData[str][i])
      numList.push(transData[num][i])
      countList.push(1)
    } else {
      numList[strList.indexOf(transData[str][i])] += transData[num][i]
      countList[strList.indexOf(transData[str][i])]++
    }
  }
  for (i = 0; i < strList.length; i++) {
    numList[i] /= countList[i]
  }
  return [strList, numList]
}
var count = (str, num, transData) => {
  let i, strList, countList, _length
  _length = transData[str].length
  strList = []
  countList = []
  for (i = 0; i < _length; i++) {
    if (strList.indexOf(transData[str][i]) < 0) {
      strList.push(transData[str][i])
      countList.push(1)
    } else {
      countList[strList.indexOf(transData[str][i])]++
    }
  }
  return [strList, countList]
}
export {mean, sum, median, count}

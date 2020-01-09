var _median = (arr, mid) => {
  // _mean 为内部方法， mid不会为空
  let left = 0
  let l, r, key
  let right = arr.length - 1
  while (left < right) {
    l = left
    r = right
    key = arr[r]
    while (l < r) {
      while (l < r && arr[l] <= key) {
        l++
      }
      arr[r] = arr[l]
      // console.log()
      while (l < r && arr[r] >= key) {
        r--
      }
      arr[l] = arr[r]
      // console.log(l, r)
    }
    arr[l] = key
    // console.log(arr, key)
    if (l === mid) {
      return arr[l]
    } else if (l < mid) {
      left = l + 1
    } else if (l > mid) {
      right = l - 1
    }
  }
  return arr[left]
}
// console.log(left)
var median = (arr) => {
  if (arr.length < 0) {
    return undefined
  } else if (arr.length % 2) {
    return _median(arr, parseInt(arr.length / 2))
  } else {
    return (_median(arr, parseInt(arr.length / 2)) + _median(arr, parseInt(arr.length / 2) - 1)) / 2
  }
}
// var xx = [6, 22, 9, 25, 19, 37, 2, 39, 43, 51, 58, 64, 65, 68, 83, 85, 89, 95, 98, 99]
// var yy = [6, 4, 10, 26, 11, 17, 37, 44, 50, 57, 67, 59, 70, 70, 91, 83, 80]
// console.log(median(xx))
// console.log(median(yy))
export {median}

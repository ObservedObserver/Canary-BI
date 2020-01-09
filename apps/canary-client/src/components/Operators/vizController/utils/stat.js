function sum (subset, MEASURES) {
  let sums = {}
  MEASURES.forEach((mea) => {
    sums[mea] = 0
  })
  for (let i = 0, len = subset.length; i < len; i++) {
    MEASURES.forEach((mea) => {
      sums[mea] += subset[i][mea]
    })
  }
  return sums
}

export {sum}

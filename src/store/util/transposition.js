var transpose = function (matrix = [[]]) {
  // console.log(matrix)
  // if (matrix.length === 0 && matrix) {
  //   return [[]]
  // }
  let row = matrix.length
  let col = matrix[0].length
  if (col === 0) {
    return [[]]
  }
  let ans = []
  let i, j
  for (i = 0; i < col; i++) {
    let line = []
    for (j = 0; j < row; j++) {
      line.push(matrix[j][i])
    }
    ans.push(line)
  }
  return ans
}

// console.log(transpose([
//   [2, 3, 1, 5],
//   [3, 2, 1, 0],
//   [0, 0, 0, 0],
//   [1, 2, 3, 4]
// ]))

// console.log(transpose([
//   [2],
//   [3],
//   [0],
//   [1]
// ]))
// console.log(transpose([[]]))
export default transpose

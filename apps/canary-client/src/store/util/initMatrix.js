var createMatrix = function (width, height, getValue) {
  let matrix = new Array(height)
  let i, j
  for (i = 0; i < height; i++) {
    matrix[i] = new Array(width)
    for (j = 0; j < width; j++) {
      matrix[i][j] = getValue(i, j)
    }
  }
  return matrix
}

// console.log(createMatrix(1, 2, 0))

export default createMatrix

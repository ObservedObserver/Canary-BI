// (function (node, index, dimensions) {
//   if (index === dimensions.length - 1) {
//     return node.get(dimensions[index]) || 'null'
//   } else if (typeof node === 'undefined') {
//     return 'null'
//   } else {
//     return arguments.callee(node.get(dimensions[index]), index + 1, dimensions)
//   }
// })(valueTree, 0, rowMatrix[r].concat(transpose(columnMatrix[c])))
// })

var getValue = (node, index, dimensions) => {
  if (index === dimensions.length - 1) {
    return (node.get(dimensions[index]) || '').toString()
  } else if (typeof node === 'undefined') {
    return ''
  } else {
    return getValue(node.get(dimensions[index]), index + 1, dimensions)
  }
}

export default getValue

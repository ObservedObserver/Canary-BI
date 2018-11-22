import {
  filterData,
  transLabel,
  dimensionValueSet,
  dataTree,
  tree2Matrix,
  transTreeDFS
} from 'bi-dataset/main.js'
import transpose from '../util/transposition.js'
import createMatrix from '../util/initMatrix.js'
import getValue from '../util/getvalue.js'
const getters = {
  originLabels (state) {
    let { dimensions, measures } = transLabel({ xlabels: state.globalDataLabels.data })
    return { dimensions, measures }
  },
  biLabels (state) {
    // let {dimensions, measures} = transLabel({xlabels: state.globalDataLabels.X, ylabels: state.globalDataLabels.Y})
    let rows = state.globalDataLabels.X.map(val => val.name)
    let columns = state.globalDataLabels.Y.map(val => val.name)
    let measures = state.globalDataLabels.value.map(val => val.name)
    let dimensions = rows.concat(columns)
    return { dimensions, measures }
  },
  viewData (state) {
    let viewData = []
    viewData = filterData({ filters: state.filters, rawData: state.globalData })
    return viewData
  },
  biTree (state, getters) {
    let { dimensions, measures } = getters.biLabels
    let statFunc = state.pickedFunc
    let tree = dataTree({ rawData: getters.viewData, dimensions, measures, statFunc })
    return tree
  },
  labelTree (state, getters) {
    let { measures } = getters.biLabels
    let btree = getters.biTree
    // let btree = dataTree({rawData: getters.viewData, dimensions, measures})
    console.log('measures', measures)

    let ans = transTreeDFS({
      bnode: ['root', btree],
      lnode: { label: 'root', children: [] },
      measures,
      level: 0
    })
    return ans
  },
  biMatrix (state, getters) {
    let tree = getters.biTree
    // console.log(tree)
    let ans = tree2Matrix({ tree })
    return ans
  },
  valueSet (state, getters) {
    let { dimensions, measures } = getters.biLabels
    let valueSet = dimensionValueSet({
      rawData: getters.viewData,
      dimensions: dimensions.concat(measures)
    })
    return valueSet
  },
  pivotData (state, getters) {
    let rows = state.globalDataLabels.X.map(val => val.name)
    let columns = state.globalDataLabels.Y.map(val => val.name)
    let measures = state.globalDataLabels.value.map(val => val.name)
    let ans = []
    if ((rows.length > 0) && (columns.length > 0)) {
      let rowTree = dataTree({ rawData: getters.viewData, dimensions: rows })
      let columnTree = dataTree({ rawData: getters.viewData, dimensions: columns })
      // console.log(columnTree, tree2Matrix({tree: columnTree}))
      let valueTree = dataTree({ rawData: getters.viewData, dimensions: rows.concat(columns), measures, statFunc: state.pickedFunc })
      // console.log(valueTree)
      let rowMatrix = tree2Matrix({ tree: rowTree })
      let originColumnMatrix = tree2Matrix({ tree: columnTree })
      for (let rarr of rowMatrix) {
        for (let carr of originColumnMatrix) {
          let r = rarr.toString()
          let c = carr.toString()
          ans.push({
            row: r,
            column: c,
            value: parseFloat(getValue(valueTree, 0, rarr.concat(carr))) || 0
          })
        }
      }
    }
    return ans
  },
  pivotTable (state, getters) {
    let rows = state.globalDataLabels.X.map(val => val.name)
    let columns = state.globalDataLabels.Y.map(val => val.name)
    let measures = state.globalDataLabels.value.map(val => val.name)
    let ans = [[]]
    if ((rows.length > 0) ^ (columns.length > 0)) {
      return getters.biMatrix
    } else if ((rows.length > 0) && (columns.length > 0)) {
      // let values = state.globalDataLabels.value
      ans = []
      let rowTree = dataTree({ rawData: getters.viewData, dimensions: rows })
      let columnTree = dataTree({ rawData: getters.viewData, dimensions: columns })
      // console.log(columnTree, tree2Matrix({tree: columnTree}))
      let valueTree = dataTree({ rawData: getters.viewData, dimensions: rows.concat(columns), measures, statFunc: state.pickedFunc })
      // console.log(valueTree)
      let rowMatrix = tree2Matrix({ tree: rowTree })
      let originColumnMatrix = tree2Matrix({ tree: columnTree })
      let columnMatrix = transpose(originColumnMatrix)
      // console.log(rowMatrix, columnMatrix)
      let emptyMatrix = createMatrix(rowMatrix[0].length, columnMatrix.length, () => '')
      let valueMatrix = createMatrix(columnMatrix[0].length, rowMatrix.length, (r, c) => {
        // console.log(rowMatrix[r].concat(transpose(columnMatrix[c])))
        return getValue(valueTree, 0, rowMatrix[r].concat(originColumnMatrix[c]))
      })
      // console.info(emptyMatrix, valueMatrix, rowMatrix, columnMatrix)
      columnMatrix.forEach((row, index, arr) => {
        // console.log('emptyMatrix', emptyMatrix[index])
        ans.push(emptyMatrix[index].concat(row || []))
      })
      // console.log("ans", ans)
      rowMatrix.forEach((row, index, arr) => {
        ans.push(row.concat(valueMatrix[index] || []))
      })
    }
    return ans
  }
}

export default getters

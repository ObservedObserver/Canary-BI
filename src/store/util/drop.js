import timeLabel from './timelabel.js'
import valueSet from './valueSet.js'
import Filter from '../model/filter'
import Field from '../model/field'
function dataDrop (state, component) {
  if (component === 'filters') {
    let values = valueSet({
      dataSource: state.globalData,
      column: state.currentLabel.name
    })
    state.globalDataLabels[component].push(new Filter({
      name: state.currentLabel.name,
      type: state.currentLabel.type,
      values
    }))
  } else if (component === 'dimensions' && state.currentLabel.isMeasure()) {
    let label = new Field().copy(state.currentLabel)
    state.globalDataLabels[component].push(label)
  } else if (component === 'measures' && state.currentLabel.isDimension()) {
    let label = new Field().copy(state.currentLabel)
    state.globalDataLabels[component].push(label)
  } else if (component === 'time' && state.currentLabel.isDimension()) {
    // 临时判断机制，正式版应支持任意数据格式饿转化
    if (typeof state.globalData[0][state.currentLabel.name] === 'string' && state.globalData[0][state.currentLabel.name].split('-').length > 1) {
      let label = new Field().copy(state.currentLabel)
      state.globalDataLabels[component].push(label)
      // 这里globaldata不受计算属性获得label可以保证新创建的year, month不会被展示
      state.globalData = timeLabel({rawData: state.globalData, timeDimension: state.currentLabel.name})
    }
  } else if (component === 'X' || component === 'Y') {
    if (state.currentLabel.isDimension() || state.currentLabel.type === 'time') {
      let label = new Field().copy(state.currentLabel)
      state.globalDataLabels[component].push(label)
    }
  } else if (component === 'value') {
    if (state.currentLabel.isMeasure()) {
      let label = new Field().copy(state.currentLabel)
      state.globalDataLabels[component].push(label)
    }
  } else if (component !== 'measures' && component !== 'dimensions' && component !== 'time') {
    let label = new Field().copy(state.currentLabel)
    state.globalDataLabels[component].push(label)
  }
}

function xyDrop (state, component) {
  if (component === 'X' || component === 'Y') {
    if (state.currentLabel.type === 'string') {
      // pass
    }
  }
}
export {dataDrop, xyDrop}

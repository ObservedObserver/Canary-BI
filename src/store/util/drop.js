import timeLabel from './timelabel.js'
function dataDrop (state, component) {
  if (component === 'dimensions' && state.currentLabel.type === 'number') {
    state.globalDataLabels[component].push({
      name: state.currentLabel.name,
      type: 'string'
    })
  } else if (component === 'measures' && state.currentLabel.type === 'string') {
    state.globalDataLabels[component].push({
      name: state.currentLabel.name,
      type: 'number'
    })
  } else if (component === 'time' && state.currentLabel.type === 'string') {
    // 临时判断机制，正式版应支持任意数据格式饿转化
    if (typeof state.globalData[0][state.currentLabel.name] === 'string' && state.globalData[0][state.currentLabel.name].split('-').length > 1) {
      state.globalDataLabels[component].push({
        name: state.currentLabel.name,
        type: 'time'
      })
      // 这里globaldata不受计算属性获得label可以保证新创建的year, month不会被展示
      state.globalData = timeLabel({rawData: state.globalData, timeDimension: state.currentLabel.name})
    }
  } else if (component === 'X' || component === 'Y') {
    if (state.currentLabel.type === 'string' || state.currentLabel.type === 'time') {
      state.globalDataLabels[component].push({
        name: state.currentLabel.name,
        type: state.currentLabel.type
      })
    }
  } else if (component === 'value') {
    if (state.currentLabel.type === 'number') {
      state.globalDataLabels[component].push({
        name: state.currentLabel.name,
        type: state.currentLabel.type
      })
    }
  } else if (component !== 'measures' && component !== 'dimensions' && component !== 'time') {
    state.globalDataLabels[component].push({
      name: state.currentLabel.name,
      type: state.currentLabel.type
    })
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

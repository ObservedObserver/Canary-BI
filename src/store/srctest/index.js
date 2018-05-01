import labelProcesser from './label.js'
import dimensionMixer from './dimension.js'
import matrixProducer from './matrix.js'
class Core {
  constructor ({rawData, xlabels, ylabels}) {
    this.rawData = rawData
    this.xlabels = xlabels
    this.ylabels = ylabels
  }
  transLabel () {
    let {dimensions, measures} = labelProcesser({xlabels: this.xlabels, ylabels: this.ylabels})
    this.dimensions = dimensions
    this.measures = measures
  }
  transDimension () {
    // 默认度量维度均存在
    if (typeof this.dimensions !== 'undefined' && typeof this.measures !=='undefined') {
      let {result, stat, lowerresult} = dimensionMixer({rawData: this.rawData, dimensions: this.dimensions, measures: this.measures})
      console.log('transDimension', {result, stat, lowerresult})
      this.mixDim = result
      this.lowerMixDim = lowerresult
      this.stat = stat
    } else {
      throw 'dimensions or measures not defined, you must use transLabel()to get it'
    }
  }
  transData () {
    if (typeof this.mixDim !== 'undefined') {
      this.data = matrixProducer({rawData: this.rawData, mixDim: this.mixDim, measures: this.measures})
    } else {
      throw 'mixDim not defined, you must use transDimension to get it.'
    }
  }
}

export default Core

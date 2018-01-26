<template lang="html">
  <chart :options="option"></chart>
</template>

<script>
// import {option} from './scatter.config.js'
export default {
  name: 'scatter',
  data () {
    return {}
  },
  computed: {
    xDataLabels () {
      return this.$store.state.globalDataLabels.X
    },
    yDataLabels () {
      return this.$store.state.globalDataLabels.Y
    },
    option () {
      var option = {
        tooltip: {
          trigger: 'axis',
          showDelay: 0
        },
        xAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        visualMap: [
          {
            inRange: {}
          }
        ],
        series: [
          {
            name: 'data',
            type: 'scatter',
            itemStyle: {},
            data: []
          }
        ]
      }
      var _trans = this.$store.getters.transData
      if (this.$store.state.filterStatistics.length !== 0) {
        _trans = this.$store.getters.transFilterData
      }
      if (this.xDataLabels.length !== 0 && this.xDataLabels[0].type === 'number') {
        if (this.yDataLabels.length !== 0 && this.yDataLabels[0].type === 'number') {
          // option.xAxis[0].type = ({'string': 'category', 'number': 'value'})[this.xDataLabels[0].type]
          // option.yAxis[0].type = ({'string': 'category', 'number': 'value'})[this.yDataLabels[0].type]
          var points = [[]]
          var pointsMap = [[]]
          let i, j, k, _length
          _length = _trans[this.xDataLabels[0].name].length
          for (i = 0; i < _length; i++) {
            points[0].push([_trans[this.xDataLabels[0].name][i], _trans[this.yDataLabels[0].name][i]])
            pointsMap[0].push(i)
          }
          if (this.$store.getters.globalDimensionLabels.length !== 0) {
            // {
            for (i = 0; i < this.$store.getters.globalDimensionLabels.length; i++) {
              if (this.$store.getters.globalDimensionLabels[i].label.name === '大小') {
                // let dimension = this.$store.state.globalDataLabels.dimension[i].name
                // if (i == 1) {
                //   for (j = 0; j < _length; j ++) {
                //     tmp = point[j][2]
                //     points[j][2] = _trans[dimension][j]
                //     points[j].push(tmp)
                //   }
                //   // 究竟是操作option还是操作label，label带动option的变化
                // } else if (i == 0) {
                //   for (j = 0; j < _length; j++) {
                //     points[j].push(_trans[dimension][j])
                //   }
                // }
                if (this.$store.getters.globalDimensionLabels[i].type === 'number') {
                  let dimension = this.$store.getters.globalDimensionLabels[i].name
                  // for (j = 0; j < _length; j++) {
                  //   points[j].push(_trans[dime nsion][j])
                  // }
                  for (j = 0; j < points.length; j++) {
                    for (k = 0; k < _length; k++) {
                      points[j][k].push(_trans[dimension][k])
                    }
                    option.series[j].symbolSize = (val) => {
                      return 2 * Math.sqrt(val[2])
                    }
                    option.series[j].data = points[j]
                  }
                }

                // 闭包实现，认为echarts可以开放到自定义映射维度时采用此方案
                // option.series[0].symbolSize = ((i) => {
                //   var index = i
                //   return (val) => {
                //     console.log(index, 'index')
                //     return 2 * Math.sqrt(val[2 + index])
                //   }
                // })(i)
              } else if (this.$store.getters.globalDimensionLabels[i].label.name === '颜色') {
                // option.series[0].itemStyle.color = ((i) => {
                //   var index = i
                //   return (val) => {
                //     console.log(index, 'color-index')
                //     return `rgba(255, 0, 0, ${Math.sqrt(val[2 + index]) / 10})`
                //   }
                // })(i)
                if (this.$store.getters.globalDimensionLabels[i].type === 'number') {
                  let dimension = this.$store.getters.globalDimensionLabels[i].name
                  // for (j = 0; j < _length; j++) {
                  //   points[j].push(_trans[dimension][j])
                  // }
                  for (j = 0; j < points.length; j++) {
                    for (k = 0; k < _length; k++) {
                      points[j][k].push(_trans[dimension][k])
                    }
                    option.visualMap[0].inRange.color = ['#0abba6', 'rgb(233, 184, 37)', '#f91b1b']
                    // 要求性质，option.series[j]一定存在
                    option.series[j].data = points[j]
                  }
                } else if (this.$store.getters.globalDimensionLabels[i].type === 'string') {
                  let dimension = this.$store.getters.globalDimensionLabels[i].name
                  // let _series = {
                  //   name: 'data',
                  //   type: 'scatter',
                  //   itemStyle: {},
                  //   data: []
                  // }
                  option.series = []
                  let set = [...(new Set(_trans[dimension]))]
                  for (j = 0; j < set.length; j++) {
                    let _series = {
                      name: set[j],
                      type: 'scatter',
                      itemStyle: {},
                      data: []
                    }
                    // 考虑两个分类维度如何实现？
                    option.series.push(_series)
                  }
                  // let _data = []
                  // push _data into points after loop
                  for (j = 0; j < points.length; j++) {
                    for (k = 0; k < points[j].length; k++) {
                      let pos = set.indexOf(_trans[dimension][pointsMap[j][k]])
                      option.series[pos].data.push([...points[j][k]])
                    }
                  }
                  console.log(option.series)
                }
              }
            }
            // }
          } else {
            option.series[0].data = points[0]
          }
          // option.series[0].data = points
        }
      }
      return option
    }
  }
}
</script>

<style lang="css">
</style>

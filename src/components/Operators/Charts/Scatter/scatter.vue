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
          var points = []
          let i, j, _length
          _length = _trans[this.xDataLabels[0].name].length
          for (i = 0; i < _length; i++) {
            points.push([_trans[this.xDataLabels[0].name][i], _trans[this.yDataLabels[0].name][i]])
          }
          if (this.$store.state.globalDataLabels.dimension.length !== 0) {
            // {
            for (i = 0; i < this.$store.state.globalDataLabels.dimension.length; i++) {
              if (this.$store.state.globalDataLabels.dimension[i].label.name === '大小') {
                let dimension = this.$store.state.globalDataLabels.dimension[i].name
                for (j = 0; j < _length; j++) {
                  points[j].push(_trans[dimension][j])
                }
                // option.visualMap[0].inRange.symbolSize = [10, 50]
                // if (i === 0) {
                //   option.series[0].symbolSize = (val) => {
                //     return 2 * Math.sqrt(val[2])
                //   }
                // } else if (i === 1) {
                //   option.series[0].symbolSize = (val) => {
                //     return 2 * Math.sqrt(val[2])
                //   }
                // }
                option.series[0].symbolSize = ((i) => {
                  var index = i
                  return (val) => {
                    console.log(index, 'index')
                    return 2 * Math.sqrt(val[2 + index])
                  }
                })(i)
              } else if (this.$store.state.globalDataLabels.dimension[i].label.name === '颜色') {
                let dimension = this.$store.state.globalDataLabels.dimension[i].name
                for (j = 0; j < _length; j++) {
                  points[j].push(_trans[dimension][j])
                }
                option.series[0].itemStyle.color = ((i) => {
                  var index = i
                  return (val) => {
                    console.log(index, 'color-index')
                    return `rgba(255, 0, 0, ${Math.sqrt(val[2 + index]) / 10})`
                  }
                })(i)
                option.visualMap[0].inRange.color = ['#0abba6', 'rgb(233, 184, 37)', '#f91b1b']
              }
            }
            // }
          }
          option.series[0].data = points
        }
      }
      return option
    }
  }
}
</script>

<style lang="css">
</style>

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
        series: [
          {
            name: 'data',
            type: 'scatter',
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
          let i, _length
          _length = _trans[this.xDataLabels[0].name].length
          for (i = 0; i < _length; i++) {
            points.push([_trans[this.xDataLabels[0].name][i], _trans[this.yDataLabels[0].name][i]])
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

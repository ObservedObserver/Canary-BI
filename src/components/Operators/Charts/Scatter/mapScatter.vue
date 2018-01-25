<template lang="html">
    <chart :options="option" id="map-chart"></chart>
</template>

<script>
import {bmapOption} from './map.js'
export default {
  name: 'mapScatter',
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
      var option = JSON.parse(JSON.stringify(bmapOption))
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
            points.push({
              name: 'test',
              value: [_trans[this.xDataLabels[0].name][i], _trans[this.yDataLabels[0].name][i]]
            })
          }
          option.series[0].data = points
        }
      }
      return option
    }
  }
}
</script>

<style lang="css" scoped>
/*.chart-father{
  position: absolute;
  left: 0rem;
  right: 0rem;
  height: 600px;
}*/
#map-chart{
  width: 100%;
}
</style>

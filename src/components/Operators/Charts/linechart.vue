<template lang="html">
  <chart :options="option()"></chart>
</template>

<script>
export default {
  name: 'lineChart',
  data () {
    return {
      xDataLabels: this.$store.state.globalDataLabels.X,
      yDataLabels: this.$store.state.globalDataLabels.Y
    }
  },
  methods: {
    option () {
      var _trans = this.$store.getters.transData
      if (this.$store.state.filterStatistics.length !== 0) {
        // console.log(this.$store.getters.transFilterData)
        // _trans = this.$store.state.transFilterData
        _trans = this.$store.getters.transFilterData
      }
      var func = this.$store.getters.statisticFunc
      if (this.xDataLabels.length !== 0 && this.yDataLabels.length !== 0) {
        // option.xAxis.data = _trans[this.xDataLabels[0].name]
        // option.series[0].data = _trans[this.yDataLabels[0].name]
        let xList, yList, i, numberAxis, stringAxis

        stringAxis = {
          type: 'category',
          data: []
        }
        numberAxis = {
          type: 'value'
        }
        var option = {
          xAxis: {},
          yAxis: {},
          series: []
        }
        if (this.xDataLabels[0].type === 'string') {
          [option.xAxis, option.yAxis] = [stringAxis, numberAxis]
          for (i = 0; i < this.yDataLabels.length; i++) {
            [xList, yList] = func(this.xDataLabels[0].name, this.yDataLabels[i].name, _trans)
            // console.log([xList, yList])
            stringAxis.data = xList
            option.series.push({
              data: yList,
              type: 'line'
            })
          }
        } else if (this.yDataLabels[0].type === 'string') {
          [option.xAxis, option.yAxis] = [numberAxis, stringAxis]
          for (i = 0; i < this.xDataLabels.length; i++) {
            [xList, yList] = func(this.yDataLabels[0].name, this.xDataLabels[i].name, _trans)
            // console.log([xList, yList])
            stringAxis.data = xList
            option.series.push({
              data: yList,
              type: 'line'
            })
          }
        }
      }
      return option
    }
  }
}

</script>

<style lang="css">
</style>

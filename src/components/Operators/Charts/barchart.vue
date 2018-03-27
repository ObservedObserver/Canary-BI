<template lang="html">
  <chart :options="option"></chart>
</template>

<script>
export default {
  name: 'barChart',
  data () {
    return {
      xDataLabels: this.$store.state.globalDataLabels.X,
      yDataLabels: this.$store.state.globalDataLabels.Y
    }
  },
  computed: {
    // horizontalTable () {
    //   // bug
    //   return this.xDataLabels.length === 0 && this.yDataLabels.length !== 0
    // },
    // filterData () {
    //   var paras = []
    //   for (var i = 0; i < this.xDataLabels.length; i++) {
    //     paras.push(this.xDataLabels[i].name)
    //   }
    //   for (i = 0; i < this.yDataLabels.length; i++) {
    //     paras.push(this.yDataLabels[i].name)
    //   }
    //   // this.$store.commit('getLocalData', paras)
    //   this.$store.commit('getLocalData', paras)
    //   if (this.$store.state.filterData.length === 0 && this.$store.state.localData.length !== 0) {
    //     return this.$store.state.localData
    //   } else {
    //     return this.$store.state.filterData
    //   }
    // },
    option () {
      var _trans = this.$store.getters.transData
      if (this.$store.state.filterStatistics.length !== 0) {
        _trans = this.$store.getters.transFilterData
      }
      var func = this.$store.getters.statisticFunc
      if (this.xDataLabels.length !== 0 && this.yDataLabels.length !== 0) {
        // option.xAxis.data = _trans[this.xDataLabels[0].name]
        // option.series[0].data = _trans[this.yDataLabels[0].name]
        let xList, yList, i, numberAxis, stringAxis
        // [xList, yList] = _sum(this.xDataLabels[0].name, this.yDataLabels[0].name)
        // console.log([xList, yList])
        // option.xAxis.data = xList
        // option.series.push({
        //   data: yList,
        //   type: 'bar'
        // })
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
          toolbox: {
            feature: {
              magicType: {
                type: ['bar', 'line', 'pie']
              }
            }
          },
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
              type: 'bar'
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
              type: 'bar'
            })
          }
        }
        // for (i = 0; i < this.yDataLabels.length; i++) {
        //   [xList, yList] = _sum(this.xDataLabels[0].name, this.yDataLabels[i].name)
        //   console.log([xList, yList])
        //   stringAxis.data = xList
        //   option.series.push({
        //     data: yList,
        //     type: 'bar'
        //   })
        // }
      }
      return option
    }
  }
}

</script>

<style lang="css">
</style>

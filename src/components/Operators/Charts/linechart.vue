<template lang="html">
  <chart :options="option"></chart>
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
  computed: {
    option () {
      var _trans = this.$store.getters.transData
      if (this.$store.state.filterCheckedList.length !== 0) {
        _trans = this.$store.getters.transFilterData
      }
      var _sum = (x, y) => {
        let i, _length, xList, yList
        _length = _trans[x].length
        xList = []
        yList = []
        for (i = 0; i < _length; i++) {
          // if (_trans[name][i])
          if (xList.indexOf(_trans[x][i]) < 0) {
            xList.push(_trans[x][i])
            yList.push(_trans[y][i])
          } else {
            yList[xList.indexOf(_trans[x][i])] += _trans[y][i]
          }
        }
        console.log(xList, yList)
        return [xList, yList]
      }
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
            [xList, yList] = _sum(this.xDataLabels[0].name, this.yDataLabels[i].name)
            console.log([xList, yList])
            stringAxis.data = xList
            option.series.push({
              data: yList,
              type: 'line'
            })
          }
        } else if (this.yDataLabels[0].type === 'string') {
          [option.xAxis, option.yAxis] = [numberAxis, stringAxis]
          for (i = 0; i < this.xDataLabels.length; i++) {
            [xList, yList] = _sum(this.yDataLabels[0].name, this.xDataLabels[i].name)
            console.log([xList, yList])
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

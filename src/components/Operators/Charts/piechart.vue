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
      if (this.$store.state.filterStatistics.length !== 0) {
        _trans = this.$store.getters.transFilterData
      }
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: []
        },
        series: []
      }
      var func = this.$store.getters.statisticFunc
      if (this.xDataLabels.length !== 0 && this.yDataLabels.length !== 0) {
        let xList, data, i

        if (this.xDataLabels[0].type === 'string') {
          for (i = 0; i < this.yDataLabels.length; i++) {
            [xList, data] = func(this.xDataLabels[0].name, this.yDataLabels[i].name, _trans)
            option.legend.data = xList
            let rad = [`${80 - i * 20}%`, `${100 - i * 20}%`]
            option.series.push({
              name: 'test', // this.yDataLabels[i].type,
              type: 'pie',
              radius: rad,
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data
            })
          }
        } else if (this.yDataLabels[0].type === 'string') {
          for (i = 0; i < this.xDataLabels.length; i++) {
            [xList, data] = func(this.yDataLabels[0].name, this.xDataLabels[i].name, _trans)
            option.legend.data = xList
            let rad = [`${80 - i * 20}%`, `${100 - i * 20}%`]
            option.series.push({
              name: 'test', // this.yDataLabels[i].type,
              type: 'pie',
              radius: rad,
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data
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

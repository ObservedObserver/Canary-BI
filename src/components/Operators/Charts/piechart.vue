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
      var _sum = (x, y) => {
        let i, _length, xList, yList, ans
        _length = _trans[x].length
        xList = []
        yList = []
        ans = []
        for (i = 0; i < _length; i++) {
          // if (_trans[name][i])
          if (xList.indexOf(_trans[x][i]) < 0) {
            xList.push(_trans[x][i])
            yList.push(_trans[y][i])
          } else {
            yList[xList.indexOf(_trans[x][i])] += _trans[y][i]
          }
        }
        // console.log(xList, yList)
        for (i = 0; i < xList.length; i++) {
          ans.push({
            name: xList[i],
            value: yList[i]
          })
        }
        return [xList, ans]
      }
      if (this.xDataLabels.length !== 0 && this.yDataLabels.length !== 0) {
        let xList, data, i

        if (this.xDataLabels[0].type === 'string') {
          for (i = 0; i < this.yDataLabels.length; i++) {
            [xList, data] = _sum(this.xDataLabels[0].name, this.yDataLabels[i].name)
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
            [xList, data] = _sum(this.yDataLabels[0].name, this.xDataLabels[i].name)
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

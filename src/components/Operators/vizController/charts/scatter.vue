<template>
  <chart  :options="option" style="width:100%;height: 400px" />
</template>
<script>
function getChartOption () {
  return {
    legend: {},
    tooltip: {},
    xAxis: [],
    yAxis: [],
    grid: [],
    series: []
  }
}

export default {
  name: 'scatter-chart',
  data () {
    return {}
  },
  props: {
    dataSource: {
      type: Object,
      default () {
        return []
      }
    },
    dimensions: {
      type: Array,
      default () {
        return []
      }
    },
    measures: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    option () {
      let option = getChartOption()
      let {dataSource, measures} = this.$props
      let facets = [...dataSource.children.keys()]
      let viewHeight = {
        margin: 2,
        height: parseInt(100 / facets.length)
      }
      option.xAxis = facets.map((facet, index) => {
        return {gridIndex: index}
      })
      option.yAxis = facets.map((facet, index) => {
        return {gridIndex: index}
      })
      option.grid = facets.map((facet, index) => {
        return {
          top: 5 + index * viewHeight.height + viewHeight.margin + '%',
          bottom: 5 + 100 - ((index + 1) * viewHeight.height - viewHeight.margin) + '%'
        }
      })
      option.series = facets.map((facet, index) => {
        let data = []
        let values = [...dataSource.children.values()]
        values.forEach(item => {
          item.rawData.forEach((r) => {
            data.push([r[measures[0]], r[measures[1]]])
          })
        })
        return {
          type: 'scatter',
          xAxisIndex: index,
          yAxisIndex: index,
          data: data
        }
      })
      console.log(option, dataSource)
      return option
    }
  }
}
</script>
<style>
</style>

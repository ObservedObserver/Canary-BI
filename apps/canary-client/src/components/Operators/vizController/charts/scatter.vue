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
      let {dataSource, dimensions} = this.$props
      let facets
      if (dimensions.length >= 3) {
        facets = [...dataSource.children.keys()]
      } else {
        // root of cube tree's tag
        facets = ['all']
      }
      console.log(facets)
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
        let xs = [...dataSource.children.entries()]
        xs.forEach(x => {
          let ys = [...x[1].children.entries()]
          ys.forEach(y => {
            data.push([x[0], y[0]])
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

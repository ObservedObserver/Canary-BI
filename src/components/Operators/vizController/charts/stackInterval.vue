<template>
  <chart  :options="option" style="width:100%;height: 400px" />
</template>
<script>
function getChartOption () {
  return {
    legend: {},
    tooltip: {},
    // dataset: {
    //   source: []
    // },
    xAxis: [],
    yAxis: [],
    grid: [],
    series: []
  }
}
function getUniqueArray (arr = [], field) {
  if (typeof field === 'undefined') { return [] }
  let set = new Set()
  arr.forEach(item => {
    set.add(item[field])
  })
  return [...set]
}
export default {
  name: 'stack-interval-chart',
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
      let {dataSource, dimensions, measures} = this.$props
      let facets = [...dataSource.children.keys()]
      let viewHeight = {
        margin: 2,
        height: parseInt(100 / facets.length)
      }
      option.xAxis = facets.map((facet, index) => {
        return {
          type: 'category',
          gridIndex: index,
          data: [...dataSource.children.get(facet).children.keys()]
        }
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
      option.series = []
      facets.forEach((facet, index) => {
        for (let child of dataSource.children.get(facet).children.values()) {
          option.series.push({
            type: 'bar',
            stack: 'stack' + index,
            xAxisIndex: index,
            yAxisIndex: index,
            data: [...child.children.values()].map(item => item._aggData[measures[0]])
          })
        }
      })
      return option
    }
  }
}
</script>
<style>
</style>

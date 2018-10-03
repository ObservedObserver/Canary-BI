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
  name: 'group-interval-chart',
  data () {
    return {}
  },
  props: {
    dataSource: {
      type: Array,
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
      let {dimensions, measures, dataSource} = this.$props
      let facetYs = getUniqueArray(dataSource, dimensions[0])
      let groupBy = getUniqueArray(dataSource, dimensions[1])
      let viewHeight = {
        margin: 2,
        height: parseInt(100 / facetYs.length)
      }
      option.xAxis = facetYs.map((mea, index) => {
        return {type: 'category', gridIndex: index}
      })
      option.yAxis = facetYs.map((mea, index) => {
        return {gridIndex: index}
      })
      option.grid = facetYs.map((mea, index) => {
        return {
          top: index * viewHeight.height + viewHeight.margin + '%',
          bottom: 100 - ((index + 1) * viewHeight.height - viewHeight.margin) + '%'
        }
      })
      facetYs.forEach((facet, index) => {
        groupBy.forEach((group) => {
          option.series.push({
            type: 'bar',
            xAxisIndex: index,
            yAxisIndex: index,
            data: dataSource.filter(record => {
              return record[dimensions[0]] === facet && record[dimensions[1]] === group
            }).map(item => item[measures[0]])
          })
        })
      })
      return option
    }
  }
}
</script>
<style>
</style>

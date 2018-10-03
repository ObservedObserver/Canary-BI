<template>
  <chart  :options="option" style="width:100%;height: 400px" />
</template>
<script>
function getChartOption () {
  return {
    legend: {},
    tooltip: {},
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
  name: 'simple-pie-chart',
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
      let rad = parseInt(100 / facetYs.length)
      option.series = facetYs.map((facet, index) => {
        return {
          type: 'pie',
          radius: [0, `${rad * 0.9}%`],
          center: [`${rad * (index + 0.5)}%`, '50%'],
          label: {
            formatter: '{b}: {d}%'
          },
          data: dataSource.filter(record => {
            return record[dimensions[0]] === facet
          }).map(item => item[measures[0]])
        }
      })
      return option
    }
  }
}
</script>
<style>
</style>

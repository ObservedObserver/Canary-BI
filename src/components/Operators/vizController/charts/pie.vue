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
export default {
  name: 'simple-pie-chart',
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
      let {dimensions, measures, dataSource} = this.$props
      let facets = [...dataSource.children.keys()]
      let rad = parseInt(100 / facets.length)
      option.series = facets.map((facet, index) => {
        return {
          type: 'pie',
          radius: [0, `${rad * 0.9}%`],
          center: [`${rad * (index + 0.5)}%`, '50%'],
          label: {
            formatter: '{b}: {d}%'
          },
          data: [...dataSource.children.get(facet).children.entries()]
            .map(item => {
              return {
                name: item[0],
                value: item[1]._aggData[measures[0]]
              }
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

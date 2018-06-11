<template lang="html">
  <chart class="barcharts" :options="option" />
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'heat-map',
  data () {
    return {
      initOption: {
        title: {},
        legend: {
          type: 'scroll'
        },
        tooltip: {},
        dataset: {
          // dimensions: [],
          source: []
        },
        xAxis: {
          type: 'category',
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          splitArea: {
            show: true
          }
        },
        series: []
      }
    }
  },
  props: {
    nodes: {
      type: Array,
      default () {
        return []
      }
    },
    level: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  computed: {
    dataset () {
      // let level = this.$props.level
      let nodes = this.$props.nodes.filter((item) => {
        return item.level === this.$props.level
      })
      console.log('nodes', nodes)
      let {dimensions, measures} = this.$store.getters.biLabels
      let ans = nodes.map((node, index) => {
        return [node.label, ...node.value]
      })
      ans.unshift([dimensions[dimensions.length - 1], ...measures])
      return ans
    },
    option () {
      let op = deepcopy(this.initOption)
      op.dataset.source = this.dataset
      let {dimensions, measures} = this.$store.getters.biLabels
      measures.forEach((mea) => {
        console.log({
          x: dimensions[0],
          y: dimensions[1],
          z: measures[0]
        })
        op.series.push({
          type: 'heatmap',
          encode: {
            x: dimensions[0],
            y: dimensions[1],
            z: measures[0]
          }
        })
      })
      return op
    }
  }
}
</script>

<style lang="css">
.barchart{
  width: 100%;
  min-width: 0px;
}
</style>

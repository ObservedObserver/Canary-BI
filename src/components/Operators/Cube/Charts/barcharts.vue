<template lang="html">
  <chart class="barcharts" :options="option" />
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'bar-chart',
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
        xAxis: {type: 'category'},
        yAxis: {},
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
    }
  },
  computed: {
    dataset () {
      let nodes = this.$props.nodes
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
      let {measures} = this.$store.getters.biLabels
      measures.forEach((mea) => {
        op.series.push({
          type: 'bar'
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

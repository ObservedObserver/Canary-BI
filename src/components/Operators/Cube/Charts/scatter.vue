<template lang="html">
  <chart class="barcharts" :options="option" style="width:100%;height: 400px" />
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'scatter-chart',
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
    },
    level: {
      type: Number,
      default () {
        return 0
      }
    },
    save: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  watch: {
    save (newValue, oldValue) {
      if (newValue && !oldValue) {
        this.$emit('processSave', deepcopy(this.option))
      }
    }
  },
  computed: {
    dataset () {
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
      let {measures} = this.$store.getters.biLabels
      measures.forEach((mea) => {
        op.series.push({
          type: 'scatter',
          encode: {
            x: measures[0],
            y: measures[1]
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

<template lang="html">
  <div class="chart-container">
    <chart class="barcharts" :options="option" style="width:100%;height: 400px" />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
import { bmapStyle } from '../style/map.style.js'
export default {
  name: 'scatter-map',
  data () {
    return {
      transposition: 0,
      spaceMode: false,
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
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: bmapStyle
        },
        // xAxis: {},
        // yAxis: {},
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
      let dataSource = this.dataset.slice(1)
      measures.forEach((mea) => {
        op.series.push({
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: dataSource.map(row => {
            return {value: row.slice(1)}
          }),
          symbolSize (val) {
            return val[2] / 2
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
.chart-container{
  padding-top: 0.36rem;
}
</style>

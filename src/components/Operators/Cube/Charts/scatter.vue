<template lang="html">
  <div class="chart-container">
    <el-button size="mini" @click="transposition++">转置</el-button>
    <el-switch
      v-model="spaceMode"
      active-text="3D(开启)"
      inactive-text="3D(关闭)">
    </el-switch>
    <chart class="barcharts" :options="option" style="width:100%;height: 400px" />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'scatter-chart',
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
        xAxis: {},
        yAxis: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
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
      let usedMeasures = 2
      if (this.spaceMode && measures.length >= 3) {
        op.grid3D = {width: '100%', height: '100%'}
        op.xAxis.show = false
        op.yAxis.show = false
        usedMeasures = 3
      }
      measures.forEach((mea) => {
        op.series.push({
          type: this.spaceMode ? 'scatter3D' : 'scatter',
          encode: {
            x: measures[this.transposition % usedMeasures],
            y: measures[(this.transposition + 1) % usedMeasures],
            z: measures[(this.transposition + 2) % usedMeasures]
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

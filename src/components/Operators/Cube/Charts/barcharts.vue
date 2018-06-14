<template lang="html">
  <div class="chart-container">
    <el-switch
      v-model="stackMode"
      active-text="堆叠(开启)"
      inactive-text="堆叠(关闭)">
    </el-switch>
    <el-switch
      v-model="transposition"
      active-text="转置(开启)"
      inactive-text="转置(关闭)">
    </el-switch>
    <chart @saveOption="console.log('saveOption')" class="barcharts" :options="option" style="width:100%;height: 400px" />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'bar-chart',
  data () {
    return {
      stackMode: false,
      transposition: false,
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
      this.transposition ? op.yAxis.type = 'category' : op.xAxis.type = 'category'
      measures.forEach((mea) => {
        op.series.push({
          type: 'bar',
          stack: this.stackMode ? 'stack' : undefined
        })
      })
      return op
    }
  },
  watch: {
    save (newValue, oldValue) {
      if (newValue && !oldValue) {
        this.$emit('processSave', deepcopy(this.option))
      }
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

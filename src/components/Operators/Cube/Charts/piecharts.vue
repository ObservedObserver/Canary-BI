<template lang="html">
  <div class="chart-container">
    <el-switch
      v-model="roseMode"
      active-text="玫瑰模式(开启)"
      inactive-text="玫瑰模式(关闭)">
    </el-switch>
    <chart class="barcharts" :options="option" style="width:100%;height: 400px"  />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'pie-chart',
  data () {
    return {
      roseMode: false,
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
      let {measures = []} = this.$store.getters.biLabels
      let rad = parseInt(100 / measures.length)
      console.log('rad', rad)
      measures.forEach((mea, index) => {
        op.series.push({
          type: 'pie',
          radius: [this.roseMode ? `${rad * 0.1}%` : 0, `${rad * 0.9}%`],
          roseType: this.roseMode ? 'radius' : undefined,
          center: [`${rad * (index + 0.5)}%`, '50%']
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

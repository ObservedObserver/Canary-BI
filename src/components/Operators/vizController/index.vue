<template>
  <div>
    <interval-chart v-if="chartType === 'bar'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" />
    <line-chart v-if="chartType === 'line'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" />
    <pie-chart v-if="chartType === 'pie'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" />
    <scatter-chart v-if="chartType === 'scatter'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" />
    <group-interval v-if="chartType === 'group-interval'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" />
    <stack-interval v-if="chartType === 'stack-interval'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" />
  </div>
</template>
<script>
import scatterChart from './charts/scatter.vue'
import intervalChart from './charts/interval.vue'
import lineChart from './charts/line.vue'
import pieChart from './charts/pie.vue'
import groupInterval from './charts/groupInterval.vue'
import stackInterval from './charts/stackInterval.vue'
import {createCube} from 'cube-core'
// import {tree2Matrix} from './utils/foldTree.js'
import {sum} from './utils/stat.js'
const MEASURE_NAME = 'measure_name'
const MEASURE_VALUE = 'measure_value'
export default {
  name: 'viz-controller',
  components: {
    scatterChart,
    stackInterval,
    groupInterval,
    intervalChart,
    lineChart,
    pieChart
  },
  data () {
    return {}
  },
  props: {
    chartType: {
      type: String,
      default: 'bar'
    }
  },
  computed: {
    cube () {
      let factTable = this.foldData
      let dimensions = this.dimensions
      let measures = this.measures
      let cube = createCube({
        aggFunc: sum,
        factTable,
        dimensions,
        measures
      })
      return cube
    },
    dimensions () {
      if (this.$props.chartType === 'scatter') {
        return this.$store.getters.biLabels.dimensions
          .slice(0, 1)
          .concat(this.$store.getters.biLabels.measures)
      }
      return [MEASURE_NAME].concat(this.$store.getters.biLabels.dimensions)
    },
    measures () {
      if (this.$props.chartType === 'scatter') {
        return this.$store.getters.biLabels.measures
      }
      return [MEASURE_VALUE]
    },
    dataSource () {
      return this.cube.tree
      // let dimensions = this.dimensions
      // return tree2Matrix({tree: this.cube.tree, dimensions})
    },
    foldData () {
      let dataSource = this.$store.getters.viewData
      let {measures} = this.$store.getters.biLabels
      let foldData = []
      dataSource.forEach((record) => {
        measures.forEach(mea => {
          foldData.push({
            ...record,
            [MEASURE_NAME]: mea,
            [MEASURE_VALUE]: record[mea]
          })
        })
      })
      console.log('new dataSource', dataSource)
      return foldData
    }
  }
}
</script>
<style>
</style>

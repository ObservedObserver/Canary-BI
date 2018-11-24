<template>
  <el-card>
    <!-- <interval-chart v-if="chartType === 'bar'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" /> -->
    <simple-interval v-if="chartType === 'bar'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    />
    <simple-line v-if="chartType === 'line'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    />
    <simple-pie v-if="chartType === 'pie'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    />
    <scatter-chart v-if="chartType === 'scatter'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    />
    <!-- <group-interval v-if="chartType === 'group-interval'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" /> -->
    <group-interval v-if="chartType === 'group-interval'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    />
    <stack-interval v-if="chartType === 'stack-interval'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    />
    <simple-card v-if="chartType === 'simple-card'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures"
    />
    <div>
      <h4>Function</h4>
      <el-button>Save to Lib</el-button>
    </div>
  </el-card>
</template>
<script>
import simpleInterval from './widgets/simpleInterval.vue'
import scatterChart from './widgets/scatter.vue'
import intervalChart from './charts/interval.vue'
import simpleLine from './widgets/simpleLine.vue'
import simplePie from './widgets/simplePie.vue'
// import groupInterval from './charts/groupInterval.vue'
import groupInterval from './widgets/groupInterval.vue'
import stackInterval from './widgets/stackInterval.vue'
import simpleCard from './cards/simpleCard.vue'
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
    simpleLine,
    simplePie,
    simpleCard,
    simpleInterval
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
  methods: {
    saveChart () {
      // fix mode
      let vizJson = {
        color: this.color,
        shape: this.shape,
        opacity: this.opacity,
        size: this.size,
        operations: this.operations,
        dataSource: this.rawData,
        dimensions: this.rawDimensions,
        measures: this.rawMeasures,
        chartType: this.$props.chartType
      }
      this.$store.commit('createChartTemplate', {
        vizJson
      })
    }
  },
  computed: {
    color () {
      return this.$store.state.globalDataLabels.color.slice(0, 1).map(item => item.name)[0]
    },
    shape () {
      return this.$store.state.globalDataLabels.shape.slice(0, 1).map(item => item.name)[0]
    },
    size () {
      return this.$store.state.globalDataLabels.size.slice(0, 1).map(item => item.name)[0]
    },
    opacity () {
      return this.$store.state.globalDataLabels.opacity.slice(0, 1).map(item => item.name)[0]
    },
    operations () {
      let ope = this.$store.state.pickedFunc
      return this.$store.getters.biLabels.measures.map(item => ope)
    },
    rawDimensions () {
      return this.$store.getters.biLabels.dimensions
    },
    rawMeasures () {
      return this.$store.getters.biLabels.measures
    },
    rawData () {
      return this.$store.state.globalData
    },
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

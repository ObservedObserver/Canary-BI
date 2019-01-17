<template>
  <el-card>
    <!-- <interval-chart class="chart-in-analysis" v-if="chartType === 'bar'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" /> -->
    <simple-interval class="chart-in-analysis" v-if="chartType === 'bar'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    :coord="coord"
    :transpose="transpose"
    :constScale="constScale"
    />
    <simple-line  class="chart-in-analysis" v-if="chartType === 'line'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    :coord="coord"
    :transpose="transpose"
    :constScale="constScale"
    />
    <simple-pie class="chart-in-analysis" v-if="chartType === 'pie'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    :coord="'theta'"
    :transpose="transpose"
    :constScale="constScale"
    />
    <scatter-chart class="chart-in-analysis" v-if="chartType === 'scatter'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    :coord="coord"
    :transpose="transpose"
    :constScale="constScale"
    />
    <!-- <group-interval class="chart-in-analysis" v-if="chartType === 'group-interval'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" /> -->
    <group-interval class="chart-in-analysis" v-if="chartType === 'group-interval'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    :coord="coord"
    :transpose="transpose"
    :constScale="constScale"
    />
    <stack-interval class="chart-in-analysis" v-if="chartType === 'stack-interval'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    :coord="coord"
    :transpose="transpose"
    :constScale="constScale"
    />
    <area-chart class="chart-in-analysis" v-if="chartType === 'area'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    :coord="coord"
    :transpose="transpose"
    :constScale="constScale"
    />
    <simple-card class="chart-in-analysis" v-if="chartType === 'simple-card'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures"
    />
    <div>
      <h4>功能</h4>
      <el-form label-width="80px" label-position="right">
        <el-form-item label="坐标系">
          <el-select v-model="coord" placeholder="请选择" :disabled="chartType === 'pie'">
            <el-option
              v-for="item in coordOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转置">
          <el-switch v-model="transpose">
          </el-switch>
        </el-form-item>
        <el-form-item label="统一标度">
          <el-switch v-model="constScale">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveChart" type="success">保存至图表库</el-button>
        </el-form-item>
      </el-form>
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
import areaChart from './widgets/area.vue'
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
    simpleInterval,
    areaChart
  },
  data () {
    return {
      coordOptions: [
        {value: 'rect', label: '直角坐标系'},
        {value: 'polar', label: '极坐标'},
        {value: 'theta', label: '环形坐标系'},
        {value: 'helix', label: '螺旋坐标系'}
      ],
      coord: 'rect',
      transpose: false,
      constScale: false
    }
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
        filters: this.filters,
        coord: this.$props.chartType === 'pie' ? 'theta' : this.coord,
        transpose: this.transpose,
        // dataSource: this.rawData,
        dsIndex: this.$store.state.defaultDataSource,
        dimensions: this.rawDimensions,
        measures: this.rawMeasures,
        constScale: this.constScale,
        type: this.$props.chartType
      }
      this.$store.commit('addChart', vizJson)
    }
  },
  computed: {
    color () {
      // bad design no use limit
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
    filters () {
      return this.$store.state.globalDataLabels.filters
    },
    operations () {
      return this.$store.state.globalDataLabels.value.map(item => {
        return item.aggFunc
      })
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
<style scoped>
.chart-in-analysis{
  height: 500px;
}
</style>

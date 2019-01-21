<template>
  <div style="wdith: 100%; height: 100%">
    <!-- <interval-chart v-if="chart.type === 'bar'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" /> -->
    <simple-interval style="width: 100%; height: 100%" v-if="chart.type === 'bar'"
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
    :constScale="constScale"
    :transpose="transpose"
    :event="event"
    @geomClick="geomClick"
    />
    <simple-line style="width: 100%; height: 100%"  v-if="chart.type === 'line'"
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
    :constScale="constScale"
    :transpose="transpose"
    :event="event"
    @geomClick="geomClick"
    />
    <simple-pie style="width: 100%; height: 100%"  v-if="chart.type === 'pie'"
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
    :constScale="constScale"
    :transpose="transpose"
    :event="event"
    @geomClick="geomClick"
    />
    <scatter-chart style="width: 100%; height: 100%"  v-if="chart.type === 'scatter'"
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
    :constScale="constScale"
    :transpose="transpose"
    :event="event"
    :aggregate="aggregate"
    @geomClick="geomClick"
    />
    <!-- <group-interval v-if="chart.type === 'group-interval'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" /> -->
    <group-interval style="width: 100%; height: 100%"  v-if="chart.type === 'group-interval'"
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
    :constScale="constScale"
    :transpose="transpose"
    :event="event"
    @geomClick="geomClick"
    />
    <stack-interval style="width: 100%; height: 100%"  v-if="chart.type === 'stack-interval'"
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
    :constScale="constScale"
    :transpose="transpose"
    :event="event"
    @geomClick="geomClick"
    />
    <area-chart class="chart-in-analysis" v-if="chart.type === 'area'"
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
    :event="event"
    :constScale="constScale"
    />
    <simple-card v-if="chart.type === 'simple-card'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures"
    />
  </div>
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
    return {}
  },
  props: {
    chart: { type: Object },
    event: {
      type: Boolean,
      default: false
    },
    boardFilter: {
      type: Array,
      default () {
        return []
      }
    },
    boardIndex: { type: Number },
    setFilter: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    geomClick ({filters}) {
      if (this.$props.setFilter) {
        let oldFilters = this.$props.boardFilter.filter(f => {
          return !(filters.find(item => {
            return item.name === f.name
          }))
        })
        this.$store.commit('setDashBoardFilters', {
          boardIndex: this.$props.boardIndex,
          filters: oldFilters.concat(filters)
        })
      }
    }
  },
  computed: {
    color () {
      // bad design no use limit
      return this.$props.chart.color
    },
    shape () {
      return this.$props.chart.shape
    },
    size () {
      return this.$props.chart.size
    },
    opacity () {
      return this.$props.chart.opacity
    },
    operations () {
      return this.$props.chart.operations
    },
    filters () {
      if (this.$props.setFilter) {
        return this.$props.chart.filters
      }
      return this.$props.boardFilter.concat(this.$props.chart.filters)
    },
    coord () {
      return this.$props.chart.coord
    },
    transpose () {
      return this.$props.chart.transpose
    },
    constScale () {
      return this.$props.chart.constScale
    },
    aggregate () {
      return this.$props.chart.aggregate
    },
    rawDimensions () {
      return this.$props.chart.dimensions
    },
    rawMeasures () {
      return this.$props.chart.measures
    },
    rawData () {
      let dataSourceList = this.$store.state.database.dataSource
      let dsIndex = this.$props.chart.dsIndex(dataSourceList)
      return dataSourceList[dsIndex].foreignDB.dataSource
    },
    dimensions () {
      if (this.$props.chart.type === 'scatter') {
        return this.rawDimensions
          .slice(0, 1)
          .concat(this.rawMeasures)
      }
      return [MEASURE_NAME].concat(this.rawDimensions)
    },
    measures () {
      if (this.$props.chart.type === 'scatter') {
        return this.rawMeasures
      }
      return [MEASURE_VALUE]
    },
    dataSource () {
      return this.rawData
      // return this.cube.tree
      // let dimensions = this.dimensions
      // return tree2Matrix({tree: this.cube.tree, dimensions})
    }
  }
}
</script>
<style>
</style>

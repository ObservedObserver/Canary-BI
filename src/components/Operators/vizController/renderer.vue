<template>
  <div style="wdith: 100%; height: 100%">
    <!-- <interval-chart v-if="vizJson.type === 'bar'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" /> -->
    <simple-interval style="width: 100%; height: 100%" v-if="vizJson.type === 'bar'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    @geomClick="geomClick"
    />
    <simple-line style="width: 100%; height: 100%"  v-if="vizJson.type === 'line'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    />
    <simple-pie style="width: 100%; height: 100%"  v-if="vizJson.type === 'pie'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    />
    <scatter-chart style="width: 100%; height: 100%"  v-if="vizJson.type === 'scatter'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    />
    <!-- <group-interval v-if="vizJson.type === 'group-interval'"
    :dataSource="dataSource"
    :dimensions="dimensions"
    :measures="measures" /> -->
    <group-interval style="width: 100%; height: 100%"  v-if="vizJson.type === 'group-interval'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    />
    <stack-interval style="width: 100%; height: 100%"  v-if="vizJson.type === 'stack-interval'"
    :dataSource="rawData"
    :dimensions="rawDimensions"
    :measures="rawMeasures"
    :operations="operations"
    :color="color"
    :shape="shape"
    :opacity="opacity"
    :size="size"
    :filters="filters"
    />
    <simple-card v-if="vizJson.type === 'simple-card'"
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
    vizJson: { type: Object },
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
      return this.$props.vizJson.color
    },
    shape () {
      return this.$props.vizJson.shape
    },
    size () {
      return this.$props.vizJson.size
    },
    opacity () {
      return this.$props.vizJson.opacity
    },
    operations () {
      return this.$props.vizJson.operations
    },
    filters () {
      if (this.$props.setFilter) {
        return this.$props.vizJson.filters
      }
      return this.$props.boardFilter.concat(this.$props.vizJson.filters)
    },
    rawDimensions () {
      return this.$props.vizJson.dimensions
    },
    rawMeasures () {
      return this.$props.vizJson.measures
    },
    rawData () {
      let dsIndex = this.$props.vizJson.dsIndex
      return this.$store.state.database.dataSource[dsIndex].foreignDB.dataSource
    },
    dimensions () {
      if (this.$props.vizJson.type === 'scatter') {
        return this.rawDimensions
          .slice(0, 1)
          .concat(this.rawMeasures)
      }
      return [MEASURE_NAME].concat(this.rawDimensions)
    },
    measures () {
      if (this.$props.vizJson.type === 'scatter') {
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

<template>
  <div :id="chartId"></div>
</template>
<script>
import DataSet from '@antv/data-set'
import G2 from '@antv/g2'
import elementResizeDetectorMaker from 'element-resize-detector'
import Filter from '@/store/model/filter'
import {uniqueCount} from '../utils/unique'
import vizConfig from '../config/index'
let cnt = 0
function getChartId () {
  return 'area-chart-' + cnt++
}
const MEASURE_NAME = 'MEASURE_NAME'
const MEASURE_VALUE = 'MEASURE_VALUE'
export default {
  name: 'simple-area',
  props: {
    dimensions: { type: Array },
    measures: { type: Array },
    dataSource: { type: Array },
    isLabel: { type: Array },
    operations: { type: Array },
    color: { type: String },
    shape: { type: String },
    size: { type: String },
    opacity: { type: String },
    filters: { type: Array },
    coord: { type: String },
    transpose: { type: Boolean },
    constScale: { type: Boolean }
  },
  data () {
    return {
      chartId: getChartId(),
      chart: undefined,
      renderCondition: {
        dimensions: [0, 2],
        measures: [1, Infinity]
      }
    }
  },
  mounted () {
    this.chart = new G2.Chart({
      container: this.chartId,
      forceFit: true
    })
    this.renderChart()
    this.chart.on('point:click', ev => {
      console.log('line click')
      let filters = [
        new Filter({
          name: this.position[0],
          type: 'string',
          filterType: 'equal',
          values: [ev.data._origin[this.position[0]]]
        })
      ]
      this.$emit('geomClick', { filters })
    })
    let self = this
    this.erd = elementResizeDetectorMaker()
    this.erd.listenTo(this.$el, (ele) => {
      self.chart.changeSize(ele.offsetWidth, ele.offsetHeight)
    })
  },
  beforeDestroy () {
    this.chart.off('point:click')
    this.erd.removeAllListeners(this.$el)
    this.erd = null
  },
  watch: {
    dimensions () {
      this.renderChart()
    },
    measures () {
      this.renderChart()
    },
    dataSource () {
      this.renderChart()
    },
    isLabel () {
      this.renderChart()
    },
    operations () {
      this.renderChart()
    },
    color () {
      this.renderChart()
    },
    opacity () {
      this.renderChart()
    },
    shape () {
      this.renderChart()
    },
    size () {
      this.renderChart()
    },
    filters () {
      this.renderChart()
    },
    coord () {
      this.renderChart()
    },
    transpose () {
      this.renderChart()
    },
    constScale () {
      this.renderChart()
    }
  },
  computed: {
    dimCode () {
      return this.$props.dimensions.slice(0, this.renderCondition.dimensions[1])
    },
    meaCode () {
      return this.$props.measures.slice(0, this.renderCondition.measures[1])
    },
    mapMeaCode () {
      return this.meaCode.map(item => {
        return item + '(aggregate)'
      })
    },
    scale () {
      const {dataSource, coord, constScale} = this.$props
      let ans = {}
      let fields = [...this.meaCode, ...this.dimCode, MEASURE_NAME, MEASURE_VALUE]
      fields.forEach(item => {
        ans[item] = {
          sync: constScale
        }
      })
      let dim = this.dimCode.slice(-1)[0]
      let dimAxis = dataSource.map(item => {
        return item[dim]
      })
      if (uniqueCount(dimAxis) > 20) {
        this.dimCode.forEach(item => {
          ans[item] = {
            sync: constScale,
            tickCount: parseInt(vizConfig.tickCount[coord] / this.meaCode.length)
          }
        })
      }
      return ans
    },
    data () {
      let dv = new DataSet().createView()
      dv.source(this.$props.dataSource)
      let filters = this.$props.filters
      dv.transform({
        type: 'filter',
        callback (row) {
          return filters.every(f => {
            if (f.filterType === 'range') {
              return row[f.name] >= f.value[0] && row[f.name] <= f.value[1]
            } else {
              return f.value.indexOf(row[f.name]) !== -1
            }
          })
        }
      })
      dv.transform({
        type: 'aggregate',
        fields: this.meaCode,
        operations: this.$props.operations,
        as: this.mapMeaCode,
        groupBy: this.dimCode
      })
      dv.transform({
        type: 'fold',
        fields: this.mapMeaCode,
        key: MEASURE_NAME,
        value: MEASURE_VALUE
      })
      return dv
    },
    position () {
      if (this.dimCode.length === 0) {
        return [MEASURE_NAME, MEASURE_VALUE]
      }
      return this.dimCode.slice(-1).concat(MEASURE_VALUE)
    },
    facetFields () {
      return this.dimCode.slice(0, -1)
    },
    allowRender () {
      if (this.meaCode.length < this.renderCondition.measures[0]) {
        return false
      }
      if (this.dimCode.length < this.renderCondition.dimensions[0]) {
        return false
      }
      return true
    }
  },
  methods: {
    renderCoord () {
      const {coord, transpose} = this.$props
      let c = this.chart.coord(coord)
      if (transpose) { c.transpose() }
    },
    renderLine (view) {
      const {color, shape, opacity, size} = this.$props
      let geom = view.line()
      geom.position(this.position)
      if (typeof color !== 'undefined') {
        geom.color(color)
      }
      if (typeof opacity !== 'undefined') {
        geom.opacity(opacity)
      }
      if (typeof size !== 'undefined') {
        geom.size(size)
      }
      if (typeof shape !== 'undefined') {
        geom.shape(shape)
      }
    },
    renderArea (view) {
      const {color, shape, opacity, size} = this.$props
      let geom = view.area()
      geom.position(this.position)
      if (typeof color !== 'undefined') {
        geom.color(color)
      }
      if (typeof opacity !== 'undefined') {
        geom.opacity(opacity)
      }
      if (typeof size !== 'undefined') {
        geom.size(size)
      }
      if (typeof shape !== 'undefined') {
        geom.shape(shape)
      }
    },
    renderChart () {
      if (this.allowRender) {
        let self = this
        this.chart.clear()
        this.chart.source(this.data)
        this.chart.scale(this.scale)
        this.renderCoord()
        this.chart.facet('rect', {
          fields: [MEASURE_NAME].concat(this.facetFields),
          eachView (view) {
            self.renderLine(view)
            self.renderArea(view)
          }
        })
        this.chart.render()
      }
    }
  }
}
</script>

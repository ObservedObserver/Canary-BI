<template>
  <div :id="chartId"></div>
</template>
<script>
import DataSet from '@antv/data-set'
import G2 from '@antv/g2'
import elementResizeDetectorMaker from 'element-resize-detector'
import Filter from '@/store/model/filter'
let cnt = 0
function getChartId () {
  return 'simple-line-' + cnt++
}
const MEASURE_NAME = 'MEASURE_NAME'
const MEASURE_VALUE = 'MEASURE_VALUE'
export default {
  name: 'simple-line',
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
    filters: { type: Array }
  },
  data () {
    return {
      chartId: getChartId(),
      chart: undefined,
      renderCondition: {
        dimensions: [0, 2],
        measures: [1, 2]
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
      let ans = {}
      let fields = [...this.meaCode, ...this.dimCode, MEASURE_NAME, MEASURE_VALUE]
      fields.forEach(item => {
        ans[item] = {
          sync: true
        }
      })
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
    renderChart () {
      if (this.allowRender) {
        const {color, shape, opacity, size} = this.$props
        let self = this
        this.chart.clear()
        this.chart.source(this.data)

        this.chart.scale(this.scale)
        this.chart.facet('rect', {
          fields: [MEASURE_NAME].concat(this.facetFields),
          eachView (view) {
            let geom = view.line()
            let geomp = view.point()
            geom.position(self.position)
            geomp.position(self.position)
            if (typeof color !== 'undefined') {
              geom.color(color)
              geomp.color(color)
            }
            if (typeof opacity !== 'undefined') {
              geom.opacity(opacity)
              geomp.opacity(opacity)
            }
            if (typeof size !== 'undefined') {
              geom.size(size)
              geomp.size(size)
            }
            if (typeof shape !== 'undefined') {
              geom.shape(shape)
              geomp.shape(shape)
            }
          }
        })
        this.chart.render()
      }
    }
  }
}
</script>

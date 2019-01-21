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
  return 'scatter-' + cnt++
}
// const MEASURE_NAME = 'MEASURE_NAME'
// const MEASURE_VALUE = 'MEASURE_VALUE'
// const SCATTER_MAX_RENDER_NUMBER = 300
export default {
  name: 'scatter',
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
    constScale: { type: Boolean },
    aggregate: { type: Boolean },
    event: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      chartId: getChartId(),
      chart: undefined,
      renderCondition: {
        dimensions: [0, 2],
        measures: [2, 2]
      }
    }
  },
  mounted () {
    let self = this
    this.erd = elementResizeDetectorMaker()
    this.erd.listenTo(this.$el, (ele) => {
      self.chart.changeSize(ele.offsetWidth, ele.offsetHeight)
    })
    this.chart = new G2.Chart({
      container: this.chartId,
      forceFit: true
    })
    this.renderChart()
    this.chart.on('point:click', ev => {
      let filters = this.position.map(mea => {
        return new Filter({
          name: mea,
          type: 'number',
          filterType: 'equal',
          values: [ev.data._origin[mea]]
        })
      })
      this.$emit('geomClick', { filters })
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
    },
    aggregate () {
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
    hyperDimensions () {
      const {color, size, shape, opacity} = this.$props
      return [color, size, shape, opacity].filter(item => {
        return typeof item !== 'undefined'
      })
    },
    scale () {
      let ans = {}
      let fields = [...this.mapMeaCode, ...this.meaCode, ...this.dimCode]
      fields.forEach(item => {
        ans[item] = {
          sync: this.$props.constScale
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
      // if (this.$props.dataSource.length > SCATTER_MAX_RENDER_NUMBER) {
      //   dv.transform({
      //     type: 'kernel-smooth.density',
      //     fields: this.position,
      //     as: [...this.position, 'density']
      //   })
      // }
      if (this.$props.aggregate) {
        if (this.dimCode.length === 0) {
          dv.transform({
            type: 'aggregate',
            fields: this.meaCode,
            operations: this.$props.operations,
            as: this.mapMeaCode,
            groupBy: this.hyperDimensions
          })
        } else {
          dv.transform({
            type: 'aggregate',
            fields: this.meaCode,
            operations: this.$props.operations,
            as: this.mapMeaCode,
            groupBy: this.dimCode
          })
        }
      }
      return dv
    },
    position () {
      if (this.$props.aggregate) {
        return this.mapMeaCode.slice(0, 2)
      }
      return this.meaCode.slice(0, 2)
    },
    facetFields () {
      return this.dimCode.slice(0, 2)
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
    renderPoint () {
      const self = this
      this.chart.facet('rect', {
        fields: this.facetFields,
        eachView (view) {
          let geom = view.point()
          console.log('render view', view)
          geom.position(self.position).shape('circle');
          (['color', 'opacity', 'size', 'shape']).filter((aesthetic) => {
            return typeof self.$props[aesthetic] !== 'undefined'
          }).forEach(aesthetic => {
            geom[aesthetic](self.$props[aesthetic])
          })
          geom.active(event)
        }
      })
    },
    renderHeatMap () {
      const self = this
      this.chart.facet('rect', {
        fields: this.facetFields,
        eachView (view) {
          let geom = view.heatmap()
          geom.color('density', 'blue-cyan-lime-yellow-red')
          geom.position(self.position);
          (['color', 'opacity']).filter((aesthetic) => {
            return typeof self.$props[aesthetic] !== 'undefined'
          }).forEach(aesthetic => {
            geom[aesthetic](self.$props[aesthetic])
          })
          geom.active(event)
        }
      })
    },
    renderChart () {
      if (this.allowRender) {
        const {coord, transpose, event} = this.$props
        this.chart.clear()
        this.chart.source(this.data)
        this.chart.scale(this.scale)
        this.chart.tooltip(event)
        let c = this.chart.coord(coord)
        if (transpose) { c.transpose() }
        this.renderPoint()
        // if (this.$props.dataSource.length > SCATTER_MAX_RENDER_NUMBER) {
        //   this.renderHeatMap()
        // } else {
        //   this.renderPoint()
        // }
        this.chart.render()
      }
    }
  }
}
</script>

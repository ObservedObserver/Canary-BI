<template>
  <div :id="chartId"></div>
</template>
<script>
import DataSet from '@antv/data-set'
import G2 from '@antv/g2'
let cnt = 0
function getChartId () {
  return 'simple-pie-' + cnt++
}
const MEASURE_NAME = 'MEASURE_NAME'
const MEASURE_VALUE = 'MEASURE_VALUE'
const MEASURE_PERCENT = 'MEASURE_PERCENT'
export default {
  name: 'simple-pie',
  props: {
    dimensions: { type: Array },
    measures: { type: Array },
    dataSource: { type: Array },
    isLabel: { type: Array },
    operations: { type: Array },
    color: { type: String },
    shape: { type: String },
    size: { type: String },
    opacity: { type: String }
  },
  data () {
    return {
      chartId: getChartId(),
      chart: undefined,
      renderCondition: {
        dimensions: [1, 2],
        measures: [1, 2]
      }
    }
  },
  mounted () {
    this.chart = new G2.Chart({
      container: this.chartId,
      forceFit: true,
      height: 500
    })
    this.renderChart()
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
      let fields = [...this.meaCode, ...this.dimCode, MEASURE_NAME, MEASURE_VALUE, MEASURE_PERCENT]
      fields.forEach(item => {
        ans[item] = {
          sync: true
        }
      })
      return ans
    },
    data () {
      let dv = new DataSet().createView()
      let defaultField = this.dimCode[this.dimCode.length - 1]
      dv.source(this.$props.dataSource)
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
      dv.transform({
        type: 'percent',
        field: MEASURE_VALUE,
        dimension: defaultField,
        groupBy: [MEASURE_NAME, ...this.facetFields],
        as: MEASURE_PERCENT
      });
      return dv
    },
    position () {
      return MEASURE_PERCENT
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
        let defaultColorField = this.dimCode[this.dimCode.length - 1]
        this.chart.clear()
        this.chart.source(this.data)

        this.chart.scale(this.scale)
        this.chart.coord('theta', {
          radius: 0.75
        })
        this.chart.facet('rect', {
          fields: [MEASURE_NAME].concat(this.facetFields),
          eachView (view) {
            let geom = view.intervalStack()
            geom.position(self.position).color(defaultColorField)
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
          }
        })
        this.chart.render()
      }
    }
  }
}
</script>

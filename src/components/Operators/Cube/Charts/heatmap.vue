<template lang="html">
    <div id="heatmap"></div>
</template>

<script>
import G2 from '@antv/g2'
const renderChart = (value, chart) => {
  chart.source(value, {
    row: {type: 'cat'},
    column: {type: 'cat'}
  })
  chart.axis('row', {
    tickLine: null,
    grid: {
      align: 'center',
      lineStyle: {
        lineWidth: 1,
        lineDash: null,
        stroke: '#f0f0f0'
      }
    }
  })
  chart.axis('column', {
    tickLine: null,
    grid: {
      align: 'center',
      lineStyle: {
        lineWidth: 1,
        lineDash: null,
        stroke: '#f0f0f0'
      }
    }
  })
  chart.polygon().position('column*row').color('value', '#BAE7FF-#1890FF-#0050B3').label('value', {
    offset: -2,
    textStyle: {
      fill: '#fff',
      shadowBlur: 2,
      shadowColor: 'rgba(0, 0, 0, .45)'
    }
  })
  chart.render()
}
export default {
  name: 'heat-map',
  data () {
    return {
      chart: null
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
    }
  },
  mounted () {
    console.log('heat map is mounted')
    this.chart = new G2.Chart({
      container: 'heatmap', // 指定图表容器 ID
      forceFit: true,
      width: 400, // 指定图表宽度
      height: 300 // 指定图表高度
    })
    renderChart(this.dataset, this.chart)
  },
  beforeDestroy () {
    console.log('heatMap is being destroyed')
    this.chart = null
  },
  computed: {
    dataset () {
      return this.$store.getters.pivotData
    }
  },
  watch: {
    dataset (newVal) {
      renderChart(newVal, this.chart)
    }
  }
}
</script>

<style lang="css">
.barchart{
  width: 100%;
  min-width: 0px;
}
</style>

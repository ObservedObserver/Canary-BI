<template lang="html">
  <div class="ui basic segment invizboard">
    <!-- <table-chart></table-chart> -->
    <div class="ui secondary pointing menu">
      <a class="item"
      v-for="(item, i) in menu"
      :class="{active: currentChart === i}"
      @click="changeChart(i)"
      :key="item.id">
        {{item.name}}
      </a>
    </div>
    <!-- <table-chart v-if="currentChart === 0"></table-chart> -->
    <better-table v-if="currentChart === 0" />
    <bar-chart v-if="currentChart === 1"></bar-chart>
    <line-chart v-if="currentChart === 2"></line-chart>
    <pie-chart v-if="currentChart === 3"></pie-chart>
    <scatter-chart v-if="currentChart === 4"></scatter-chart>
    <map-scatter v-if="currentChart === 5"></map-scatter>
    <magic-chart v-if="currentChart === 6"></magic-chart>
    <g2-line v-if="currentChart === 7"></g2-line>
    <g2-bar v-if="currentChart === 8" />
    <g2-scatter v-if="currentChart === 9" />
    <g2-pie v-if="currentChart === 10" />
    <!-- <statistics/> -->
  </div>
</template>

<script>
import tableChart from './Charts/table.vue'
import betterTable from './Charts/bettertable.vue'
import barChart from './Charts/barchart.vue'
import lineChart from './Charts/linechart.vue'
import pieChart from './Charts/piechart.vue'
import scatterChart from './Charts/Scatter/scatter.vue'
import mapScatter from './Charts/Scatter/mapScatter.vue'
import statistics from './Tool/statistics.vue'
import magicChart from './MagicChart/barchart.vue'
import g2Line from './G2Charts/linechart.vue'
import g2Bar from './G2Charts/barchart.vue'
import g2Scatter from './G2Charts/scatter.vue'
import g2Pie from './G2Charts/piechart.vue'
export default {
  name: 'vizboard',
  data () {
    return {
      menu: [
        {
          name: '表格',
          child: '<table-chart></table-chart>'
        },
        {
          name: '柱状图',
          child: '<bar-chart></bar-chart>'
        },
        {
          name: '折线图',
          child: '<line-chart></line-chart>'
        },
        {
          name: '饼图',
          child: '<pie-chart></pie-chart>'
        },
        {
          name: '散点图',
          child: '<scatter-chart></scatter-chart>'
        },
        {
          name: '地图',
          child: '<map-scatter></map-scatter>'
        },
        {
          name: 'magic',
          child: '<magic-chart></magic-chart>'
        },
        {
          name: 'G2-Line',
          child: '<g2-line />'
        },
        {
          name: 'G2-Bar',
          child: '<g2-bar />'
        },
        {
          name: 'G2-Scatter',
          child: '<g2-scatter />'
        },
        {
          name: 'G2-Pie',
          child: '<g2-pie />'
        }
      ],
      currentChart: 0
    }
  },
  methods: {
    changeChart (i) {
      this.currentChart = i
    }
  },
  components: {
    tableChart,
    betterTable,
    barChart,
    lineChart,
    pieChart,
    scatterChart,
    mapScatter,
    statistics,
    magicChart,
    g2Line,
    g2Bar,
    g2Scatter,
    g2Pie
  }
}
</script>

<style lang="css" scoped>
.ui.basic.segment.invizboard{
  max-height: 56rem;
  overflow: auto;
}
.ui.secondary.pointing.menu{
  overflow-x: auto;
}
</style>

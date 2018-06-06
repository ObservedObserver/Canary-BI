<template lang="html">
  <div class="invizboard">
    <el-menu :default-active="currentChart" mode="horizontal" @select="changeChart">
      <el-menu-item v-for="(item, i) in menu" :key="item.name" :index="i.toString()">{{item.name}}</el-menu-item>
    </el-menu>
    <div class="charts-board">
      <test-chart />
      <magic-table v-if="currentChart === '0'" />
      <!-- <magic-chart type="bar" v-if="currentChart === '1'" />
      <magic-chart type="line" v-if="currentChart === '2'" />
      <magic-chart type="pie" v-if="currentChart === '3'" />
      <magic-chart type="scatter" v-if="currentChart === '4'" /> -->
      <!-- <magic-chart v-if="currentChart !== '0'" :type="menu[currentChart].name" /> -->
    </div>
    <!-- <statistics/> -->
  </div>
</template>

<script>
import magicTable from './MagicChart/table.vue'
import statistics from './Tool/statistics.vue'
import magicChart from './MagicChart/superchart/index.vue'
import magicLine from './MagicChart/linechart.vue'
import magicPie from './MagicChart/piechart.vue'
import magicScatter from './MagicChart/scatter.vue'
import testChart from './MagicChart/testchart.vue'
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
          name: 'bar',
          child: '<magic-bar />'
        },
        {
          name: 'line',
          child: '<magic-line />'
        },
        {
          name: 'pie',
          child: '<magic-pie />'
        },
        {
          name: 'scatter',
          child: '<magic-scatter />'
        }
      ],
      currentChart: '0'
    }
  },
  methods: {
    changeChart (key, keypath) {
      this.currentChart = key
    }
  },
  components: {
    // betterTable,
    statistics,
    magicChart,
    magicLine,
    magicPie,
    magicScatter,
    magicTable,
    testChart
  }
}
</script>

<style lang="css" scoped>
.invizboard{
  padding: 1rem;
  max-height: 56rem;
  overflow: auto;
}
.ui.secondary.pointing.menu{
  overflow-x: auto;
}
.charts-board{
  margin-top: 1rem;
}
</style>

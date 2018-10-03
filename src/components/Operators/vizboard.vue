<template lang="html">
  <div class="invizboard">
    <el-menu :default-active="currentChart" mode="horizontal" @select="changeChart">
      <el-menu-item v-for="(item, i) in chartMenu" :key="analysisType + item.name" :index="i.toString()">{{item.name}}</el-menu-item>
    </el-menu>
    <div class="charts-board">
      <div v-if="analysisType === 'Main-1'">
        <vizController :chartType="chartMenu[parseInt(currentChart)].name" />
      </div>
      <div v-if="analysisType === 'Main-2'">
        <cube :cid="parseInt(currentChart)" v-if="parseInt(currentChart) >= 1 && parseInt(currentChart) <= 4"/>
        <magic-table v-if="currentChart === '0'" />
      </div>
    </div>
  </div>
</template>

<script>
import magicTable from './MagicChart/pivottable.vue'
import statistics from './Tool/statistics.vue'
import magicChart from './MagicChart/superchart/index.vue'
import magicLine from './MagicChart/linechart.vue'
import magicPie from './MagicChart/piechart.vue'
import magicScatter from './MagicChart/scatter.vue'
import cube from './Cube/index.vue'
// import pivot from './Pivot/index.vue'
import vizController from './vizController/index.vue'
export default {
  name: 'vizboard',
  data () {
    return {
      menu: {
        analysis: [
          { name: '表格' },
          { name: 'bar' },
          { name: 'line' },
          { name: 'pie' },
          { name: 'scatter' }
        ],
        dashboard: [
          { name: 'bar' },
          { name: 'line' },
          { name: 'pie' },
          { name: 'group-interval' }
        ]
      },
      currentChart: '0'
    }
  },
  methods: {
    changeChart (key, keypath) {
      this.currentChart = key
    }
  },
  computed: {
    analysisType () {
      return this.$store.state.page
    },
    chartMenu () {
      if (this.analysisType === 'Main-1') {
        return this.menu.dashboard
      } else if (this.analysisType === 'Main-2') {
        return this.menu.analysis
      } else {
        return []
      }
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
    cube,
    vizController
    // pivot
  }
}
</script>

<style lang="css" scoped>
.invizboard{
  padding: 1rem;
  /* margin-top: 10rem; */
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

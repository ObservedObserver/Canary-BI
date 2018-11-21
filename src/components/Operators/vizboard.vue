<template lang="html">
  <div class="invizboard">
    <el-menu :default-active="currentChart" mode="horizontal" @select="changeChart">
      <el-menu-item v-for="(item, i) in chartMenu" :key="analysisType + item.name" :index="i.toString()">{{item.label}}</el-menu-item>
    </el-menu>
    <div class="charts-board">
      <div v-if="analysisType === 0">
        <vizController :chartType="chartMenu[parseInt(currentChart)].name" />
      </div>
      <div v-if="analysisType === 1">
        <cube :cid="parseInt(currentChart)" v-if="parseInt(currentChart) >= 1 && parseInt(currentChart) <= 5"/>
        <magic-table v-if="currentChart === '1'" />
        <normal-table v-if="currentChart === '0'" />
      </div>
    </div>
  </div>
</template>

<script>
import normalTable from './commons/table.vue'
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
          { name: 'normal-table', label: '表格' },
          { name: 'pivot-table', label: '数据透视表' },
          { name: 'bar', label: '柱状图' },
          { name: 'line', label: '折线图' },
          { name: 'pie', label: '饼图' },
          { name: 'scatter', label: '散点图' },
          { name: 'map', label: '地图' }
        ],
        dashboard: [
          { name: 'bar', label: '柱状图' },
          { name: 'line', label: '折线图' },
          { name: 'pie', label: '饼图' },
          { name: 'group-interval', label: '分组柱状图' },
          { name: 'stack-interval', label: '堆叠柱状图' },
          { name: 'scatter', label: '散点图' },
          { name: 'simple-card', label: '卡片' }
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
      return this.$store.state.page.secondary
    },
    chartMenu () {
      if (this.analysisType === 0) {
        return this.menu.dashboard
      } else if (this.analysisType === 1) {
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
    vizController,
    normalTable
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

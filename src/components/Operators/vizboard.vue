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
    <magic-table v-if="currentChart === 0" />
    <magic-bar v-if="currentChart === 1" />
    <magic-line v-if="currentChart === 2" />
    <magic-pie v-if="currentChart === 3" />
    <magic-scatter v-if="currentChart === 4" />
    <!-- <statistics/> -->
  </div>
</template>

<script>
import magicTable from './MagicChart/table.vue'
import statistics from './Tool/statistics.vue'
import magicBar from './MagicChart/barchart.vue'
import magicLine from './MagicChart/linechart.vue'
import magicPie from './MagicChart/piechart.vue'
import magicScatter from './MagicChart/scatter.vue'
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
      currentChart: 0
    }
  },
  methods: {
    changeChart (i) {
      this.currentChart = i
    }
  },
  components: {
    // betterTable,
    statistics,
    magicBar,
    magicLine,
    magicPie,
    magicScatter,
    magicTable
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

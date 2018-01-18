<template lang="html">
  <div class="ui basic segment invizboard">
    <!-- <table-chart></table-chart> -->
    <div class="ui secondary menu">
      <a class="item"
      v-for="(item, i) in menu"
      :class="{active: currentChart === i}"
      @click="changeChart(i)"
      :key="item.id">
        {{item.name}}
      </a>
    </div>
    <table-chart v-if="currentChart === 0"></table-chart>
    <bar-chart v-if="currentChart === 1"></bar-chart>
    <line-chart v-if="currentChart === 2"></line-chart>
    <pie-chart v-if="currentChart === 3"></pie-chart>
  </div>
</template>

<script>
import tableChart from './Charts/table.vue'
import barChart from './Charts/barchart.vue'
import lineChart from './Charts/linechart.vue'
import pieChart from './Charts/piechart.vue'
export default {
  name: 'vizboard',
  data () {
    return {
      menu: [
        {
          name: 'table',
          child: '<table-chart></table-chart>'
        },
        {
          name: 'bar chart',
          child: '<bar-chart></bar-chart>'
        },
        {
          name: 'line chart',
          child: '<line-chart></line-chart>'
        },
        {
          name: 'pie chart',
          child: '<pie-chart></pie-chart>'
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
    barChart,
    lineChart,
    pieChart
  }
}
</script>

<style lang="css" scoped>
.ui.basic.segment.invizboard{
  max-height: 56rem;
  overflow: auto;
}
</style>

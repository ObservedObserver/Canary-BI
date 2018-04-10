<template lang="html">
  <div class="ui two column grid">
    <div class="column" v-for="chart in charts" :key="chart.name">
        <i class="big area chart bordered icon"></i>
        {{chart.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'charts-menu',
  data () {
    return {
      charts: [
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
      ]
    }
  }
}
</script>

<style lang="css" scoped>
div.ui.card div.image{
  width: 10rem;
  height: 10rem;
}
</style>

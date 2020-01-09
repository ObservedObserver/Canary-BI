<template lang="html">
  <el-container class="clear-padding">
    <el-container style="margin-top: 1rem">
      <el-main class="clear-padding">
        <viz-board></viz-board>
      </el-main>
      <el-aside width="400px">
        <filters></filters>
        <selected-data />
        <data-board></data-board>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import statMenu from '../StatMenu/index.vue'
import filters from './Tool/filters/index.vue'
import dataBoard from './data.vue'
import xymenu from './xymenu.vue'
import vizBoard from './vizboard.vue'
import selectedData from './selectedData/index.vue'
// import dimension from './dimension.vue'
import statistics from './Tool/statistics.vue'
// import chartsMenu from './Charts/chartsmenu.vue'
export default {
  name: 'main-operator',
  components: {
    statMenu,
    filters,
    dataBoard,
    xymenu,
    vizBoard,
    // dimension,
    statistics,
    selectedData
    // chartsMenu
  }
}
</script>

<style lang="css" scoped>
.clear-padding{
  padding: 0px;
}
</style>

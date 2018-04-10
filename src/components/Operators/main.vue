<template lang="html">
  <div class="main-operator">
    <xymenu></xymenu>
    <div class="ui grid">
      <div class="ui ten wide column">
        <viz-board></viz-board>
      </div>
      <div class="ui two wide column">
          <charts-menu />
      </div>
      <div class="ui four wide column">
        <div class="ui basic segment" id="right-tools">
          <filters></filters>
          <!-- <pages></pages> -->
          <statistics/>
          <dimension></dimension>
          <data-board></data-board>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filters from './filters.vue'
import pages from './pages.vue'
import dataBoard from './data.vue'
import xymenu from './xymenu.vue'
import vizBoard from './vizboard.vue'
import dimension from './dimension.vue'
import statistics from './Tool/statistics.vue'
import chartsMenu from './Charts/chartsmenu.vue'
export default {
  name: 'main-operator',
  components: {
    filters,
    pages,
    dataBoard,
    xymenu,
    vizBoard,
    dimension,
    statistics,
    chartsMenu
  }
}
</script>

<style lang="css" scoped>
.main-operator{
  position: fixed;
  left: 6.2rem;
  right: 0rem;
  top: 0rem;
  bottom: 0rem;
  overflow-y: auto;
}
#right-tools{
  height: 100%;
  /*overflow-x: hidden;*/
  overflow-y: auto;
}
</style>

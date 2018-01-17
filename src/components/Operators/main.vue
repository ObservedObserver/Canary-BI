<template lang="html">
  <div class="main-operator">
    <xymenu></xymenu>
    <div class="ui grid">
      <div class="ui eleven wide column">
        <viz-board></viz-board>
      </div>
      <div class="ui five wide column">
        <div class="ui basic segment">
          <filters></filters>
          <pages></pages>
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

export default {
  name: 'main-operator',
  components: {
    filters,
    pages,
    dataBoard,
    xymenu,
    vizBoard
  }
}
</script>

<style lang="css">
.main-operator{
  position: fixed;
  left: 6.2rem;
  right: 0rem;
  top: 0rem;
  bottom: 0rem;
}
</style>

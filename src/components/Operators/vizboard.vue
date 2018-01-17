<template lang="html">
  <div class="ui basic segment invizboard">
    <table-chart></table-chart>
  </div>
</template>

<script>
import tableChart from './Charts/table.vue'
export default {
  name: 'vizboard',
  components: {
    tableChart
  }
}
</script>

<style lang="css" scoped>
.ui.basic.segment.invizboard{
  max-height: 56rem;
  overflow: auto;
}
</style>

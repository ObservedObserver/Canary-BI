<template lang="html">
  <div class="ui segment">
    <h3 class="ui header">{{name}}</h3>
    <div class="ui divider"></div>
    <drag-area class="ui basic segment infilter" area-name="filter"></drag-area>
  </div>
</template>

<script>
import dragArea from './dragarea.vue'
export default {
  name: 'filter-board',
  data () {
    return {
      name: 'filter'
    }
  },
  components: {
    dragArea
  }
}
</script>

<style lang="css" scoped>
.ui.basic.segment.infilter{
  height: 6rem;
}
</style>

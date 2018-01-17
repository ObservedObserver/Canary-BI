<template lang="html">
  <div class="ui segment">
    <h3 class="ui header">{{name}}</h3>
    <div class="ui divider"></div>
    <drag-area class="ui basic segment indata" area-name="data"></drag-area>
  </div>
</template>

<script>
import dragArea from './dragarea.vue'

export default {
  name: 'data-board',
  data () {
    return {
      name: 'data'
    }
  },
  components: {
    dragArea
  }
}
</script>

<style lang="css" scoped>
.ui.basic.segment.indata{
  height: 12rem;
  max-height: 16rem;
  overflow-y: auto;
}
</style>

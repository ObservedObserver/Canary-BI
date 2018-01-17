<template lang="html">
  <div class="ui two item menu">
    <drag-area class="item" area-name="X" title="X"></drag-area>
    <drag-area class="item" area-name="Y" title="Y"></drag-area>
  </div>
</template>

<script>
import dragArea from './dragarea.vue'

export default {
  name: 'xymenu',
  data () {
    return {}
  },
  components: {
    dragArea
  }
}
</script>

<style lang="css">
</style>

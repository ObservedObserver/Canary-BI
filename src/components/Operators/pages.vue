<template lang="html">
  <div class="ui segment">
    <h3 class="ui header">{{name}}</h3>
    <div class="ui divider"></div>
    <drag-area class="ui basic segment inpage" area-name="page"></drag-area>
  </div>
</template>

<script>
import dragArea from './dragarea.vue'
export default {
  name: 'pages-board',
  data () {
    return {
      name: 'page'
    }
  },
  components: {
    dragArea
  }
}
</script>

<style lang="css" scoped>
.ui.basic.segment.inpage{
  height: 6rem;
}
</style>

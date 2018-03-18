<template lang="html">
  <div class="ui segment">
    <h3 class="ui header">{{name}}</h3>
    <i class="ui large angle link icon" id="data-hider"
    :class="hider[hiderStatus]"
    @click="changeHiderStatus"></i>
    <div v-if="!hiderStatus">
      <div class="ui divider"></div>
      <drag-area class="ui basic segment indata" area-name="data"></drag-area>
    </div>
  </div>
</template>

<script>
import dragArea from './dragarea.vue'

export default {
  name: 'data-board',
  data () {
    return {
      name: 'data',
      hider: ['down', 'left'],
      hiderStatus: 0
    }
  },
  methods: {
    changeHiderStatus () {
      this.hiderStatus = (this.hiderStatus + 1) % 2
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
#data-hider{
  position: absolute;
  right: 1rem;
  top: 1rem;
}
</style>

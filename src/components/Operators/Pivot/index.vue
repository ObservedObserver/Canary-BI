<template lang="html">
  <el-card>
    <heat-map v-if="cid === 5"></heat-map>
    <g2-bar v-if="cid === 6"/>
  </el-card>
</template>

<script>
import heatMap from './G2-Charts/heatmap.vue'
import g2Bar from './G2-Charts/barchart.vue'
export default {
  name: 'pivot-card',
  props: {
    cid: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  components: {
    heatMap,
    g2Bar
  }
}
</script>

<style lang="css">
</style>

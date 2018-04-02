<template lang="html">
  <div>
  <v-chart :forceFit="true" :height="height" :data="data">
    <v-tooltip />
    <v-axis />
    <v-line :position="coord" />
    <v-point :position="coord" shape="circle" />
  </v-chart>
</div>
</template>

<script>
export default {
  name: 'g2LineChart',
  data () {
    return {
      height: 500
    }
  },
  computed: {
    data () {
      return this.$store.getters.jsonDataSet
    },
    coord () {
      console.log(this.$store.getters.jsonCoord)
      return this.$store.getters.jsonCoord
    }
  }
  // components: {
  //   vChart,
  //   vTooltip,
  //   vEdge,
  //   vView,
  //   vPolygon,
  //   vCoord
  // }
}
</script>

<style lang="css">
</style>

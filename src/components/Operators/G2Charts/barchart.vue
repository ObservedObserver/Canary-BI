<template lang="html">
  <div>
    <v-chart :forceFit="true" :height="height" :data="data">
      <v-tooltip />
      <v-axis />
      <v-bar :position="coord" />
    </v-chart>
  </div>
</template>

<script>
import { View } from '@antv/data-set'
// const dv = new View()
export default {
  name: 'g2BarChart',
  data () {
    return {
      height: 500,
      dv: new View()
    }
  },
  computed: {
    data () {
      return this.$store.getters.jsonDataSet
      // var rawData = this.$store.getters.jsonDataSet
      // this.dv.source(rawData)
      // this.dv.transform({
      //   type: 'fold',
      //   fields: ['value'],
      //   key: 'name-t',
      //   value: 'value-s'
      // })
      // return this.dv
    },
    coord () {
      return this.$store.getters.jsonCoord
    }
  }
}
</script>

<style lang="css">
</style>

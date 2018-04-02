<template lang="html">
<div>
  <v-chart :forceFit="true" :height="height" :data="data">
    <v-tooltip :showTitle="false" dataKey="item*percent" />
    <v-axis />
    <v-legend dataKey="name" />
    <v-pie position="percent" color="name"/>
    <v-coord type="theta" />
  </v-chart>
</div>
</template>

<script>
import { View } from '@antv/data-set'
export default {
  name: 'g2PieChart',
  data () {
    return {
      height: 500,
      dv: new View()
    }
  },
  computed: {
    data () {
      var rawData = this.$store.getters.jsonDataSet
      this.dv.source(rawData)
      this.dv.transform({
        type: 'percent',
        field: 'value',
        dimension: 'name',
        as: 'percent'
      })
      return this.dv.rows
    },
    coord () {
      console.log(this.$store.getters.jsonCoord)
      return this.$store.getters.jsonCoord
    }
  }
}
</script>

<style lang="css">
</style>

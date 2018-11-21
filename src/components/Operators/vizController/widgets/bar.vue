<template>
  <v-chart v-if="allowRender" :data="data" :forceFit="true" :height="400">
    <v-tooltip />
    <v-axis />
    <v-facet type="rect" :fields="facetFields">
      <v-facet-view>
        <v-bar :position="position" />
      </v-facet-view>
    </v-facet>
  </v-chart>
</template>
<script>
import DataSet from '@antv/data-set'
export default {
  name: 'simple-interval',
  props: {
    dimensions: { type: Array },
    measures: { type: Array },
    dataSource: { type: Array },
    isLabel: { type: Array },
    operations: { type: Array }
  },
  computed: {
    dimCode () {
      return this.$props.dimensions.slice(0, 2)
    },
    meaCode () {
      return this.$props.measures.slice(0, 2)
    },
    mapMeaCode () {
      return this.meaCode.map(item => {
        return item + '_agg'
      })
    },
    data () {
      let dv = new DataSet().createView()
      dv.source(this.$props.dataSource)
      dv.transform({
        type: 'aggregate',
        fields: this.meaCode,
        operations: this.$props.operations,
        as: this.mapMeaCode,
        groupBy: this.dimCode
      })
      return dv.rows
    },
    position () {
      return this.dimCode.slice(-1).concat(this.mapMeaCode.slice(0, 1))
    },
    facetFields () {
      return this.dimCode.slice(0, -1)
    },
    allowRender () {
      if (this.position.length !== 2) {
        return false
      }
      return true
      // if (this.fi)
    }
  }
}
</script>

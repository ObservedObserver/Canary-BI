<template lang="html">
  <div>
   <v-chart :forceFit="true" :height="height" :data="data">
     <v-tooltip :showTitle="false"  />
     <v-axis />
     <v-point :position="coord" :size="4" :opacity="0.65" shape="circle" />
   </v-chart>
 </div>
</template>

<script>
export default {
  name: 'g2Scatter',
  data () {
    return {
      height: 500
    }
  },
  computed: {
    data () {
      var rawData = this.$store.getters.jsonDataSet
      return rawData
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

<template>
  <div>
    <BarChart
      :data="dataset"
    />
  </div>
</template>
<script>
import createG2 from 'g2-vue'

const BarChart = createG2(chart => {
  chart.interval().position('column*value').color('row')
  chart.render()
})

export default {
  components: {
    BarChart
  },
  data () {
    return {}
  },
  computed: {
    dataset () {
      return this.$store.getters.pivotData
    }
  }
}
</script>

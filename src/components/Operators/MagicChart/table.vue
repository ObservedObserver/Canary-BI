<template lang="html">
  <div>
    <table class="ui table">
      <thead>
        <tr>
          <td v-for="head in tableHeader" :key="head.id">{{head}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.id">
          <td v-for="cell in row" :key="cell.id">{{cell}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'magic-table',
  computed: {
    tableData () {
      if (this.$store.state.globalDataLabels.X.length + this.$store.state.globalDataLabels.X.length === 0) {
        return [[]]
      }
      let {dataset, dimensions} = this.$store.getters.biDataset
      if (typeof dimensions !== 'undefined' && typeof dataset !== 'undefined' &&
        dimensions.length > 0 && dataset.length > 0) {
        return dataset.slice(1)
      } else {
        return [[]]
      }
    },
    tableHeader () {
      if (this.$store.state.globalDataLabels.X.length + this.$store.state.globalDataLabels.X.length === 0) {
        return []
      }
      let {dimensions, measures} = this.$store.getters.biLabels
      if (typeof dimensions !== 'undefined' && dimensions.length > 0) {
        return dimensions.concat(measures)
      } else {
        return []
      }
    }
  }
}
</script>

<style lang="css">
</style>

<template lang="html">
  <div>
    <table class="ui-table">
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
.ui-table tr:first-child td {
    border-top: none;
}

.ui-table tr td {
    border-top: 1px solid rgba(34, 36, 38, 0.1);
}
.ui-table td {
    padding: 0.78571429em 0.78571429em;
    text-align: inherit;
}
.ui-table {
    width: 100%;
    font-size: 1rem;
    background: #FFFFFF;
    margin: 1em 0em;
    border: 1px solid rgba(34, 36, 38, 0.15);
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 0.28571429rem;
    text-align: left;
    color: rgba(0, 0, 0, 0.87);
    border-collapse: separate;
    border-spacing: 0px;
}
</style>

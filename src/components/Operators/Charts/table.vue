<template lang="html">
  <div>

    <table class="ui collapsing table" v-if="!horizontalTable">
      <thead>
        <tr>
          <th v-for="keys in xDataLabels" :key="keys.id">
            {{keys.name}}
            <span v-for="ykeys in yDataLabels" :key="ykeys.id">,{{ykeys.name}}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in globalData" :key="row.id">
          <td v-for="column in xDataLabels" :key="column.id">
            {{globalData[i][column.name]}}
            <span v-for="ykeys in yDataLabels" :key="ykeys.id">,{{globalData[i][ykeys.name]}}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <table class="ui collapsing table" v-if="horizontalTable">
      <thead>
        <tr>
          <th v-for="ykeys in yDataLabels" :key="ykeys.id">
            {{ykeys.name}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in globalData" :key="row.id">
          <td v-for="column in yDataLabels" :key="column.id">
            {{globalData[i][column.name]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'tableChart',
  data () {
    return {
      xDataLabels: this.$store.state.globalDataLabels.X,
      yDataLabels: this.$store.state.globalDataLabels.Y,
      globalData: this.$store.state.globalData
    }
  },
  computed: {
    horizontalTable () {
      // bug
      return this.xDataLabels.length === 0 && this.yDataLabels.length !== 0
    }
  }
}
</script>

<style lang="css">
</style>

<template lang="html">
  <div>

    <table class="ui collapsing table" v-if="!horizontalTable">
      <thead>
        <tr>
          <th v-for="keys in xDataLabels" :key="keys.name">
            {{keys.name}}
            <span v-for="ykeys in yDataLabels" :key="ykeys.name">,{{ykeys.name}}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in filterData" :key="i">
          <td v-for="column in xDataLabels" :key="column.name">
            {{filterData[i][column.name]}}
            <span v-for="ykeys in yDataLabels" :key="ykeys.name">,{{filterData[i][ykeys.name]}}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <table class="ui collapsing table" v-if="horizontalTable">
      <thead>
        <tr>
          <th v-for="ykeys in yDataLabels" :key="ykeys.name">
            {{ykeys.name}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in filterData" :key="i">
          <td v-for="column in yDataLabels" :key="column.name">
            {{filterData[i][column.name]}}
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
      yDataLabels: this.$store.state.globalDataLabels.Y
    }
  },
  computed: {
    horizontalTable () {
      // bug
      return this.xDataLabels.length === 0 && this.yDataLabels.length !== 0
    },
    filterData () {
      var paras = []
      for (var i = 0; i < this.xDataLabels.length; i++) {
        paras.push(this.xDataLabels[i].name)
      }
      for (i = 0; i < this.yDataLabels.length; i++) {
        paras.push(this.yDataLabels[i].name)
      }
      // this.$store.commit('getLocalData', paras)
      this.$store.commit('getLocalData', paras)
      if (this.$store.state.filterData.length === 0 && this.$store.state.localData.length !== 0) {
        return this.$store.state.localData
      } else {
        return this.$store.state.filterData
      }
    }
  }
}
</script>

<style lang="css">
</style>

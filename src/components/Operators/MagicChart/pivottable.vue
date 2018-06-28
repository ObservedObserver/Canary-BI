<template lang="html">
  <div>
    <h5>TOTAL ROW: {{page + 1}} + {{tableData.length}} / {{dataLength}}</h5>
    <el-button-group>
      <el-button @click="page --"
      type="primary"
      icon="el-icon-arrow-left">上一页</el-button>
      <el-button @click="page ++"
      type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
    <table class="ui-table">
      <tbody>
        <tr v-for="row in tableData" :key="row.id">
          <td v-for="cell in row" :key="cell.id">{{cell}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const PAGE_ROWS = 200
export default {
  name: 'magic-table',
  data () {
    return {
      page: 0
    }
  },
  methods: {
    addPage () {
      let maxPage = parseInt(this.dataLength / PAGE_ROWS)
      this.page = Math.min(this.page + 1, maxPage)
    },
    minusPage () {
      this.page = Math.max(this.page - 1, 0)
    }
  },
  computed: {
    dataLength () {
      let dataset = this.$store.getters.biMatrix
      // let num = dataset.map(row => row.length)
      // console.log(num)
      return dataset.length
    },
    tableData () {
      if (this.$store.state.globalDataLabels.X.length + this.$store.state.globalDataLabels.Y.length === 0) {
        return [[]]
      }
      // let dataset = this.$store.getters.biDataset
      let pivotTable = this.$store.getters.pivotTable
      return pivotTable
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

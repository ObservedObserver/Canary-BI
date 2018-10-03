<template lang="html">
  <div>
    <div class="num-card-container">
      <numCard :content="numCardContent" :num="2"/>
    </div>
    <el-button-group>
      <el-button @click="minusPage('height')"
      type="primary"
      size="small"
      icon="el-icon-arrow-left">上一页(上下)</el-button>
      <el-button @click="addPage('height')"
      size="small"
      type="primary">下一页(上下)<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
    <el-button-group>
      <el-button @click="minusPage('width')"
      type="primary"
      size="small"
      icon="el-icon-arrow-left">上一页(左右)</el-button>
      <el-button @click="addPage('width')"
      size="small"
      type="primary">下一页(左右)<i class="el-icon-arrow-right el-icon--right"></i></el-button>
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
import numCard from '@/widgets/numCard.vue'
const PAGE_ROWS = 100
export default {
  name: 'magic-table',
  components: {
    numCard
  },
  data () {
    return {
      page: {
        width: 0,
        height: 0
      }
    }
  },
  methods: {
    addPage (axis) {
      let maxPage = parseInt(this.dataLength[axis] / PAGE_ROWS)
      this.page[axis] = Math.min(this.page[axis] + 1, maxPage)
    },
    minusPage (axis) {
      this.page[axis] = Math.max(this.page[axis] - 1, 0)
    }
  },
  computed: {
    dataLength () {
      let dataset = this.$store.getters.pivotTable
      // let dataset = this.$store.getters.biDataset
      let width = dataset[0].length
      let height = dataset.length
      // let num = dataset.map(row => row.length)
      // console.log(num)
      return {width, height}
    },
    tableData () {
      if (this.$store.state.globalDataLabels.X.length + this.$store.state.globalDataLabels.Y.length === 0) {
        return [[]]
      }
      // let dataset = this.$store.getters.biDataset
      let pivotTable = this.$store.getters.pivotTable
      return pivotTable.slice(this.page.height * PAGE_ROWS, (this.page.height + 1) * PAGE_ROWS).map((row) => {
        return row.slice(this.page.width * PAGE_ROWS, (this.page.width + 1) * PAGE_ROWS)
      })
    },
    numCardContent () {
      return [
        {title: '行数', value: this.page.height + '/' + this.dataLength.height},
        {title: '列数', value: this.page.width + '/' + this.dataLength.width}
      ]
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
.num-card-container{
  background-color: #FFFFFF;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>

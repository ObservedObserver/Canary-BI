<template>
  <el-card>
    <el-table :data="dataSource"
      height="550"
      border>
      <el-table-column v-for="(field, index) in fields"
      :key="field" :label="field" :prop="field"
      width="180" :fixed="index === 0 ? true : undefined"></el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="20"
        :total="dataLength">
      </el-pagination>
  </el-card>
</template>
<script>
const PAGE_SIZE = 20
export default {
  name: 'normal-table',
  data () {
    return {
      currentPage: 0
    }
  },
  computed: {
    dataSource () {
      return this.$store.getters.viewData.slice(this.currentPage * PAGE_SIZE, (this.currentPage + 1) * PAGE_SIZE)
    },
    dataLength () {
      return this.$store.getters.viewData.length
    },
    fields () {
      let {dimensions, measures} = this.$store.getters.biLabels
      return dimensions.concat(measures)
    }
  }
}
</script>

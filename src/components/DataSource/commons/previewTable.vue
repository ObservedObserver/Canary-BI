<template>
  <el-card>
    <div slot="header">
      <span>源数据</span>
    </div>
    <el-table :data="tableDataSource">
      <el-table-column v-for="(field, index) in tableDataField"
        :fixed="index === 0 ? true: undefined"
        :key="field.name"
        :prop="field.name"
        :label="formatLabel(field).content"
        width="180">
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="10"
        :total="dataLength">
      </el-pagination>
  </el-card>
</template>

<script>
const PAGE_SIZE = 10
export default {
  name: 'preview-table',
  data () {
    return {
      currentPage: 0
    }
  },
  computed: {
    dataLength () {
      return this.dataSource.length
    },
    dataSource () {
      return this.$store.state.globalData
    },
    tableDataSource () {
      return this.dataSource.slice(this.currentPage * PAGE_SIZE, (this.currentPage + 1) * PAGE_SIZE)
    },
    tableDataField () {
      // 这里只是简单的引用监控，会在部分条件下无法监控到值变化
      // return this.$store.state.dataConfig.dimensions.concat(this.$store.state.dataConfig.measures)
      return this.dataLabels
    },
    dataLabels () {
      return this.$store.state.globalDataLabels.data
    }
  },
  methods: {
    formatLabel ({type, name}) {
      return {
        content: name + '(' + type + ')',
        style: type === 'string' ? 'dim-field' : 'mea-field'
      }
    }
  }
}
</script>

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
import GLOBAL_CONFIG from '@/config/index.js'
import Field from '@/store/model/field'
const PAGE_SIZE = 10
export default {
  name: 'preview-table',
  data () {
    return {
      currentPage: 0
    }
  },
  props: {
    mode: {
      type: String,
      default () {
        return GLOBAL_CONFIG.previewMode.GLOBAL
      }
    },
    dsIndex: { type: Number }
  },
  computed: {
    dataLength () {
      return this.dataSource.length
    },
    dataSource () {
      if (this.$props.mode === GLOBAL_CONFIG.previewMode.GLOBAL) {
        return this.$store.state.globalData
      } else {
        let db = this.$store.state.database.dataSource[this.$props.dsIndex].foreignDB
        return db !== null ? db.dataSource : []
      }
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
      if (this.$props.mode === GLOBAL_CONFIG.previewMode.GLOBAL) {
        return this.$store.state.globalDataLabels.data
      } else {
        let db = this.$store.state.database.dataSource[this.$props.dsIndex].foreignDB
        let {dimensions = [], measures = []} = db !== null ? db : {}
        return [
          ...dimensions.map(item => {
            return new Field({name: item}).setDimension()
          }),
          ...measures.map(item => {
            return new Field({name: item}).setMeasure()
          })
        ]
      }
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

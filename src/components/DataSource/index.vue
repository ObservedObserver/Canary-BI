<template>
  <div class="dataSource-container">
    <h3>{{dataPageConfig[page.secondary]}}</h3>
    <div class="dataSource-map" v-if="page.secondary === 0">
      <localfile />
    </div>
    <div class="dataSource-map" v-if="page.secondary === 1">
      <restful />
    </div>
    <div class="dataSource-map" v-if="page.secondary === 2">
      <mysql />
    </div>
    <el-row style="padding: 1rem;">
      <el-col :span="14" style="padding-right: 1rem;">
        <preview-table />
      </el-col>
      <el-col :span="10" style="padding-left: 1rem;">
        <field-config />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import fieldConfig from './commons/fieldConfig.vue'
import previewTable from './commons/previewTable.vue'
import restful from './restful/index.vue'
import localfile from './localfile/index.vue'
import mysql from './mysql/index.vue'
const dataPageConfig = ['本地文件', 'Restful API', 'MySQL']
export default {
  name: 'datasource-page',
  data () {
    return { dataPageConfig }
  },
  computed: {
    page () {
      return this.$store.state.page
    }
  },
  components: {
    fieldConfig,
    previewTable,
    restful,
    localfile,
    mysql
  }
}
</script>

<style>
.dataSource-container{
  padding: 1rem;
}
.dataSource-map{
  padding: 1rem;
}
</style>

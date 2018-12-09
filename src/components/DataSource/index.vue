<template>
  <div>
    <el-menu
      mode="horizontal"
      :default-active="menu[currentPage].title"
      background-color="rgb(0, 21, 41)"
      active-text-color="#ffd04b"
      text-color="rgba(255, 255, 255, 0.65)">
      <el-menu-item
      @click="currentPage = index"
      :disabled="index > 0"
      v-for="(item, index) in menu"
      :key="item.title"
      :index="item.title">
        <template slot="title">
          <span slot="title">{{item.title}}</span>
        </template>
      </el-menu-item>
    </el-menu>
    <div class="ds-list-container" v-if="currentPage === 0">
      <div class="ds-list-operations">
        <el-button @click="createSource" type="success">创建新数据源</el-button>
      </div>
      <el-table :data="dataSourceList"
        :row-class-name="tableRowClassName"
        style="width: 100%" border>
        <el-table-column v-for="field in dataSourceListFields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="setDefault(scope.$index, scope.row)">设为默认</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-row style="padding: 1rem;">
          <el-col :span="14" style="padding-right: 1rem;">
            <preview-table />
          </el-col>
          <el-col :span="10" style="padding-left: 1rem;">
            <field-config />
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="ds-list-container" v-if="currentPage === 1">
      <data-source-config :dsIndex="dsIndex" :mode="mode" />
    </div>
  </div>
</template>
<script>
import dataSourceConfig from './dataSource'
import fieldConfig from './commons/fieldConfig.vue'
import previewTable from './commons/previewTable.vue'
export default {
  name: 'datasource-center',
  components: {
    dataSourceConfig,
    fieldConfig,
    previewTable
  },
  data () {
    return {
      menu: [
        {
          title: '数据源中心'
        },
        {
          title: '数据源配置'
        }
      ],
      currentPage: 0,
      dataSourceListFields: [
        { prop: 'title', label: '数据源名称' },
        { prop: 'colNum', label: '数据源行数' },
        { prop: 'type', label: '数据源类型' }
      ],
      currentType: 0,
      dsTitle: '',
      currentDataSource: 0,
      mode: 'create',
      dsIndex: -1,
      supportDataSourceType: [
        { label: '本地文件', value: 0 },
        { label: 'Restful API', value: 1 },
        { label: 'MySQL', value: 2 }
      ]
    }
  },
  computed: {
    dataSourceList () {
      let dataSource = this.$store.state.database.dataSource
      let ans = dataSource.map(item => {
        return {
          title: item.title || 'undefined',
          colNum: item.foreignDB === null ? 0 : item.foreignDB.dataSource.length,
          type: item.type || 'undefined'
        }
      })
      return ans
    },
    listLength () {
      return this.dataSourceList.length
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
    },
    setDefault (index, row) {
      this.$store.commit('setDefaultDataSource', index)
    },
    createSource () {
      this.dsIndex++
      this.$store.commit('createDataSource')
      this.mode = 'create'
      this.currentPage = 1
    },
    gotoList () {
      this.currentPage = 0
    },
    handleEdit (index, row) {
      this.dsIndex = index
      this.mode = 'edit'
      this.currentPage = 1
    },
    tableRowClassName ({row, rowIndex}) {
      let defaultRowIndex = this.$store.state.defaultDataSource
      if (rowIndex === defaultRowIndex) {
        return 'default-row'
      } else {
        return ''
      }
    }
  }
}
</script>
<style scpoed>
.ds-list-container{
  padding: 1rem;
}
.ds-list-operations{
  margin: 0.6rem;
}
.el-table .default-row{
  background: #f0f9eb;
}
</style>

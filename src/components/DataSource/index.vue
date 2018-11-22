<template>
  <div>
    <el-menu
      mode="horizontal"
      :default-active="menu[currentPage].title"
      background-color="rgb(0, 21, 41)"
      active-text-color="#ffd04b"
      text-color="rgba(255, 255, 255, 0.65)">
      <el-menu-item
      disabled
      v-for="item in menu"
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
      <el-table :data="dataSourceList" style="width: 100%" border>
        <el-table-column v-for="field in dataSourceListFields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
    </div>
    <div class="ds-list-container" v-if="currentPage === 1 && mode === 'create'">
      <el-form style="width: 380px">
        <el-form-item label="数据源名称">
          <el-input v-model="dsTitle"></el-input>
        </el-form-item>
        <el-form-item label="数据源类型">
          <el-select v-model="currentType">
            <el-option v-for="sourceType in supportDataSourceType"
            :key="sourceType.value"
            :label="sourceType.label"
            :value="sourceType.value"></el-option>
          </el-select>
          <el-button @click="gotoList">返回</el-button>
        </el-form-item>
      </el-form>
      <data-source-config :sourceType="currentType" :dsTitle="dsTitle" />
    </div>
    <div class="ds-list-container" v-if="currentPage === 1 && mode === 'edit'">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentDataSource"
        :total="listLength">
      </el-pagination>
      <el-form style="width: 380px">
        <el-form-item label="数据源名称">
          <el-input v-model="dsTitle"></el-input>
        </el-form-item>
        <el-form-item label="数据源类型">
          <el-select v-model="currentType">
            <el-option v-for="sourceType in supportDataSourceType"
            :key="sourceType.value"
            :label="sourceType.label"
            :value="sourceType.value"></el-option>
          </el-select>
          <el-button @click="gotoList">返回</el-button>
        </el-form-item>
      </el-form>
      <data-source-config :sourceType="currentType" :dsTitle="dsTitle" />
    </div>
  </div>
</template>
<script>
import dataSourceConfig from './dataSource'
export default {
  name: 'datasource-center',
  components: {
    dataSourceConfig
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
          title: item.title,
          colNum: item.foreignDB.dataSource.length,
          type: item.type,
        }
      })
      return ans
    },
    listLength () {
      return this.dataSourceList.length
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    createSource () {
      this.$store.commit('createDataSource')
      this.currentPage = 1
    },
    gotoList () {
      this.currentPage = 0
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
</style>

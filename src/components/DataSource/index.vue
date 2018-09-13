<template>
    <div class="datasource-container">
        <el-container>
          <el-header height="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                  Host:
                  <el-input v-model="api.host" placeholder="host" />
              </el-col>
              <el-col :span="8">
                  Port:
                  <el-input v-model="api.port" placeholder="port" />
              </el-col>
              <el-col :span="8">
                  Service:
                  <el-input v-model="api.service" placeholder="service" />
              </el-col>
            </el-row>
            <el-row style="margin-top: 1rem;">
              <el-button @click="requestData">请求数据服务</el-button> 或 <el-button @click="dropbox.show=true">上传数据集</el-button>
            </el-row>
            <el-row>
              <el-dialog width="30%" title="dropbox" :visible.sync="dropbox.show">
                <div class="drop-area"
                @dragenter="dragenter"
                @dragover="dragover"
                @drop="drop">{{dropbox.content}}</div>
                <el-row v-for="file in dropbox.files" :key="file.name">
                  <el-col :span="12">{{file.name}}</el-col>
                  <el-col :span="12">{{file.size/1024}}KB</el-col>
                </el-row>
                <el-button @click="saveDataSource">Confirm</el-button>
              </el-dialog>
            </el-row>
          </el-header>
          <el-container style="margin-top: 10px">
            <el-main>
              <el-card>
                <div slot="header">
                  <span>源数据</span>
                </div>
                <el-table :data="tableDataSource" :header-cell-class-name="fieldClass">
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
            </el-main>
            <el-aside width="400px">
              <el-card>
                <div slot="header">
                  <span>字段配置</span>
                  <el-button style="float: right" @click="setFieldConfig">确认</el-button>
                </div>
                <el-form label-position="right" label-width="100px">
                  <el-form-item v-for="(field, index) in tableDataField"
                  :label="field.name"
                  :key="field.name">
                    <el-select v-model="fieldConfig[index].type" placeholder="请选择">
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-aside>
          </el-container>
        </el-container>
    </div>
</template>
<script>
import deepcopy from 'deepcopy'
const PAGE_SIZE = 10
export default {
  name: 'dataSource',
  data () {
    return {
      api: {
        host: 'localhost',
        port: '2018',
        service: '/api/data/titanic'
      },
      showDropBox: false,
      dropbox: {
        show: false,
        content: 'Drop your file here',
        files: []
      },
      currentPage: 0,
      typeOptions: [
        {value: 'string', label: '维度'},
        {value: 'number', label: '度量'}
      ],
      fieldConfig: []
    }
  },
  computed: {
    currentAPI () {
      const { host, port, service } = this.api
      return `//${host}:${port}${service}`
    },
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
  watch: {
    dataLabels (val) {
      this.fieldConfig = deepcopy(this.dataLabels)
    }
  },
  methods: {
    requestData () {
      this.$store.commit('setCurrentAPI', this.currentAPI)
      this.$store.commit('initState', ['currentAPI', 'page'])
      this.$store.dispatch('getMainData')
    },
    setFieldConfig () {
      this.$store.commit('setFieldsType', this.fieldConfig)
    },
    formatLabel ({type, name}) {
      return {
        content: name + '(' + type + ')',
        style: type === 'string' ? 'dim-field' : 'mea-field'
      }
    },
    fieldClass ({row, column, rowIndex, columnIndex}) {
      console.log({row, column, rowIndex, columnIndex})
      return 'dim-field'
    },
    dragover (e) {
      e.stopPropagation()
      e.preventDefault()
    },
    dragenter (e) {
      e.stopPropagation()
      e.preventDefault()
    },
    drop (e) {
      e.stopPropagation()
      e.preventDefault()
      let dt = e.dataTransfer
      this.dropbox.files = dt.files
      console.log(dt.files)
    },
    saveDataSource () {
      this.$store.commit('initState', ['currentAPI', 'page'])
      this.$store.dispatch('importUploadData', {file: this.dropbox.files[0]})
      this.dropbox.show = false
    }
  }
}
</script>

<style lang="css" scoped>
.datasource-container {
  padding: 1rem;
}
.dim-field {
  color: blue!important;
  background: red;
}
.mea-field {
  color: green!important;
}
.fileover{
  background-color: #87e8de;
}
.drop-area{
  width: 260px;
  height: 160px;
  border-radius: 16px;
  border: 1px dashed grey;
  text-align: center;
  line-height: 160px;
}
</style>

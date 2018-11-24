<template>
  <div>
    <div>
      <el-form style="width: 380px">
        <el-form-item label="数据源名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="数据源类型">
          <el-select v-model="form.type" :disabled="dataSourceObj.foreignDB !== null">
            <el-option v-for="sourceType in supportDataSourceType"
            :key="sourceType.value"
            :label="sourceType.label"
            :value="sourceType.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="dataSourceObj.foreignDB !== null" 
          @click="updateDataSource">Confirm</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dataSource-container">
      <h3>{{dataPageConfig[sourceType]}}</h3>
      <div class="dataSource-map" v-if="form.type === 0">
        <localfile :dsIndex="dsIndex" />
      </div>
      <div class="dataSource-map" v-if="form.type === 1">
        <restful />
      </div>
      <div class="dataSource-map" v-if="form.type === 2">
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
  </div>
</template>

<script>
import fieldConfig from './commons/fieldConfig.vue'
import previewTable from './commons/previewTable.vue'
import restful from './restful/index.vue'
import localfile from './localfile/index.vue'
import mysql from './mysql/index.vue'
const dataPageConfig = ['本地文件', 'Restful API', 'MySQL']
// const commitFunc = ['createLocalFile', 'createRestful', 'createMySQL']
export default {
  name: 'datasource-page',
  props: ['sourceType', 'mode', 'dsIndex'],
  data () {
    return {
      dataPageConfig,
      supportDataSourceType: [
        { label: '本地文件', value: 0 },
        { label: 'Restful API', value: 1 },
        { label: 'MySQL', value: 2 }
      ],
      currentDsIndex: -1,
      form: {
        title: '',
        type: null,
        foreinDB: null
      }
    }
  },
  methods: {
    confirmType () {
      // if (this.dataSourceObj.foreinDB === null) {
      //   this.$store.commit(commitFunc[this.form.type])
      // }
    },
    updateDataSource () {
      this.$store.commit('updateDataSource', {
        dsIndex: this.currentDsIndex,
        value: this.form
      })
    }
  },
  created () {
    console.log('created')
    let dsIndex = this.$props.dsIndex
    if (this.$props.mode === 'create') {
      dsIndex = this.$store.state.database.dataSource.length - 1
      // // 是否存在新创建的数据源但尚未配置数据获取基本信息的
      // if (this.$store.state.database.dataSource[dsIndex].foreinDB !== null) {
      //   this.$store.commit('createDataSource')
      //   dsIndex = dsIndex + 1
      // }
    }
    let {title, foreinDB, type} = this.$store.state.database.dataSource[dsIndex]
    this.form.foreinDB = foreinDB
    this.form.title = title
    this.form.type = type
    this.currentDsIndex = dsIndex
  },
  mounted () {
    console.log('mounted')
  },
  computed: {
    currentType () {
      return this.form.type
    },
    dataSourceObj () {
      return this.$store.state.database.dataSource[this.currentDsIndex]
    }
  },
  // watch: {
  //   currentType () {
  //     this.$store.commit('createDB', {type: this.type, dsIndex: this.currentDsIndex})
  //     this.foreinDB = this.$store.state.database.dataSource[this.currentDsIndex].foreinDB
  //   }
  // },
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

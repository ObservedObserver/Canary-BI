<template>
  <div>
    <el-radio-group v-model="viewMode" style="margin-bottom: 30px;">
      <el-radio-button label="union">union</el-radio-button>
      <el-radio-button label="join">join</el-radio-button>
    </el-radio-group>
    <el-form :mode="viewList" v-if="viewMode === 'join'">
      <db-map :edgeList="viewList" />
      <el-row v-for="(relation, index) in viewList" :key="index">
        <el-col :span="9">
          <el-form-item label-position="right" label-width="60px" label="Table">
            <el-select v-model="relation.left.table">
              <el-option v-for="table in accessTables(index)" :key="table.tableName" :label="table.tableName" :value="table.tableName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-position="right" label-width="60px" label="key">
            <el-select v-model="relation.left.key">
              <el-option v-for="field in tableKeyList(relation.left.table)" :key="field.Field" :label="field.Field" :value="field.Field"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-position="top" label="relation">
            <el-select style="width: 100px" v-model="relation.relation">
              <el-option v-for="relation in relationList"
              :key="relation.value"
              :value="relation.value"
              :label="relation.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label-position="right" label-width="60px" label="Table">
            <el-select v-model="relation.right.table">
              <el-option v-for="table in tables" :key="table.tableName" :label="table.tableName" :value="table.tableName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-position="right" label-width="60px" label="key">
            <el-select v-model="relation.right.key">
              <el-option v-for="field in tableKeyList(relation.right.table)" :key="field.Field" :label="field.Field" :value="field.Field"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button @click="addRelation">+ Add New Relation</el-button>
    </el-form>
    <el-form v-if="viewMode === 'union'">
      <el-form-item label="Table">
        <el-select v-for="(view, index) in viewList" v-model="view.table" :key="index">
          <el-option v-for="table in tables" :key="table.tableName" :label="table.tableName" :value="table.tableName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button @click="addUnionTable">+ Add Union Table</el-button>
    </el-form>
    <el-button @click="queryData">Confirm</el-button>
  </div>
</template>
<script>
import dbMap from './dbmap.vue'
export default {
  name: 'mysql-data-view',
  props: ['mysql', 'tables', 'dsIndex'],
  components: {
    dbMap
  },
  data () {
    return {
      viewMode: 'union',
      viewList: [],
      relationList: [
        {label: 'left', value: 'LEFT'},
        {label: 'right', value: 'RIGHT'},
        {label: 'inner', value: 'INNER'}
      ],
      singleTable: undefined
    }
  },
  created () {
    let dsObj = this.dataSourceObj
    if (dsObj.foreignDB !== null) {
      // vue 双向绑定的原理导致了这种麻烦的写法
      let {dataView, mode = 'union'} = dsObj.foreignDB.dataView
      this.viewMode = mode
      this.viewList = dataView
    }
  },
  computed: {
    dataSourceObj () {
      return this.$store.state.database.dataSource[this.$props.dsIndex]
    }
  },
  watch: {
    viewMode (val) {
      this.$store.commit('changeMySQLMode', {
        mode: this.viewMode,
        dsIndex: this.$props.dsIndex
      })
      let {dataView, mode = 'union'} = this.dataSourceObj.foreignDB
      // this.viewMode = mode
      this.viewList = dataView
    }
  },
  methods: {
    addRelation () {
      this.viewList.push({
        left: {
          table: '',
          key: ''
        },
        relation: '',
        right: {
          table: '',
          key: ''
        }
      })
    },
    addUnionTable () {
      this.viewList.push({
        table: ''
      })
    },
    queryData () {
      this.$store.commit('updateSQLDataView', {
        dsIndex: this.$props.dsIndex,
        dataView: this.viewList
      })
      this.$store.dispatch('getSQLData', {dsIndex: this.$props.dsIndex})
      // let config = this.$props.mysql
      // if (this.viewMode === 'single') {
      //   let sql = `SELECT * from ${this.singleTable};`
      //   this.$store.dispatch('queryTableData', {config, sql})
      // } else {
      //   let sql = 'SELECT * from'
      //   this.viewList.forEach((view, index) => {
      //     if (index === 0) {
      //       sql += ` ${view.left.table} ${view.relation} JOIN ${view.right.table} ON ${view.left.table}.${view.left.key} = ${view.right.table}.${view.right.key}`
      //     } else {
      //       sql += ` ${view.relation} JOIN ${view.right.table} ON ${view.left.table}.${view.left.key} = ${view.right.table}.${view.right.key}`
      //     }
      //   })
      //   sql += ';'
      //   console.log(sql)
      //   this.$store.dispatch('queryTableData', {config, sql})
      // }
    },
    // queryKey () {
    //   this.$store.dispatch('')
    //   let config = this.$props.mysql
    //   let sql = `DESC ${this.singleTable};`
    //   this.$store.dispatch('queryTableStructure', {config, sql})
    // },
    tableKeyList (table) {
      let mysqlObj = this.$store.state.database.dataSource[this.$props.dsIndex].foreignDB
      if (mysqlObj !== null) {
        let tableInfo = mysqlObj.tables.find(t => {
          return table === t.tableName
        })
        if (typeof tableInfo !== 'undefined') {
          return tableInfo.fields
        }
      }
      return []
    },
    accessTables (pos) {
      let set = new Set()
      if (pos === 0) {
        return this.$props.tables
      }
      this.viewList.slice(0, pos).forEach((relation) => {
        set.add(relation.left.table)
        set.add(relation.right.table)
      })
      // console.log(set)
      let ans = [...set]
      return ans.map(name => {
        return {tableName: name}
      })
    }
  }
}
</script>
<style>
</style>

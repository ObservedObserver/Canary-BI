<template>
  <div>
    <el-radio-group v-model="viewMode" style="margin-bottom: 30px;">
      <el-radio-button label="single">single</el-radio-button>
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
    <el-form>
      <el-form-item label="Table" v-if="viewMode === 'single'">
        <el-select v-model="singleTable">
          <el-option v-for="table in tables" :key="table.tableName" :label="table.tableName" :value="table.tableName">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button @click="queryData">Confirm</el-button>
  </div>
</template>
<script>
import dbMap from './dbmap.vue'
export default {
  name: 'mysql-data-view',
  props: ['mysql', 'tables'],
  components: {
    dbMap
  },
  data () {
    return {
      viewMode: 'single',
      viewList: [],
      relationList: [
        {label: 'left', value: 'LEFT'},
        {label: 'right', value: 'RIGHT'},
        {label: 'inner', value: 'INNER'}
      ],
      singleTable: undefined
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
    queryData () {
      let config = this.$props.mysql
      if (this.viewMode === 'single') {
        let sql = `SELECT * from ${this.singleTable};`
        this.$store.dispatch('queryTableData', {config, sql})
      } else {
        let sql = 'SELECT * from'
        this.viewList.forEach((view, index) => {
          if (index === 0) {
            sql += ` ${view.left.table} ${view.relation} JOIN ${view.right.table} ON ${view.left.table}.${view.left.key} = ${view.right.table}.${view.right.key}`
          } else {
            sql += ` ${view.relation} JOIN ${view.right.table} ON ${view.left.table}.${view.left.key} = ${view.right.table}.${view.right.key}`
          }
        })
        sql += ';'
        console.log(sql)
        this.$store.dispatch('queryTableData', {config, sql})
      }
    },
    queryKey () {
      let config = this.$props.mysql
      let sql = `DESC ${this.singleTable};`
      this.$store.dispatch('queryTableStructure', {config, sql})
    },
    tableKeyList (table) {
      let tableInfo = this.$store.state.mysql.tables.find(t => {
        return table === t.tableName
      })
      if (typeof tableInfo !== 'undefined') {
        return tableInfo.keys
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

<template>
  <div>
    <el-radio-group v-model="viewMode" style="margin-bottom: 30px;">
      <el-radio-button label="single">single</el-radio-button>
      <el-radio-button label="join">join</el-radio-button>
    </el-radio-group>
    <el-form :mode="viewList" v-if="viewMode === 'join'">
      <el-row v-for="(relation, index) in viewList" :key="index">
        <el-col :span="9">
          <el-form-item label-position="right" label-width="60px" label="Table">
            <el-select>
            </el-select>
          </el-form-item>
          <el-form-item label-position="right" label-width="60px" label="key">
            <el-select>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-position="top" label="relation">
            <el-select style="width: 100px"></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label-position="right" label-width="60px" label="Table">
            <el-select>
            </el-select>
          </el-form-item>
          <el-form-item label-position="right" label-width="60px" label="key">
            <el-select>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button @click="addRelation">+ Add New Relation</el-button>
    </el-form>
    <el-form>
      <el-form-item label="Table">
        <el-select v-model="singleTable">
          <el-option v-for="table in tables" :key="table.table" :label="table.table" :value="table.table">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button @click="queryData">Confirm</el-button>
  </div>
</template>
<script>
export default {
  name: 'mysql-data-view',
  props: ['mysql', 'tables'],
  data () {
    return {
      viewMode: 'single',
      viewList: [],
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
      let sql = `SELECT * from ${this.singleTable};`
      this.$store.dispatch('queryTableData', {config, sql})
    }
  }
}
</script>
<style>
</style>

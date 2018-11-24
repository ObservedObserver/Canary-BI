<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
          Host:
          <el-input v-model="mysql.host" placeholder="host" />
      </el-col>
      <el-col :span="6">
          Port:
          <el-input v-model="mysql.port" placeholder="port" />
      </el-col>
      <el-col :span="6">
          User:
          <el-input v-model="mysql.user" placeholder="service" />
      </el-col>
      <el-col :span="6">
          Password:
          <el-input type="password" v-model="mysql.password" placeholder="service" />
      </el-col>
    </el-row>
    <el-row style="margin-top: 1rem;">
      <el-button size="small" type="primary"
      @click="connectMySQL">连接MySQL数据库</el-button>
    </el-row>
    <el-card style="margin-top: 1rem;">
      <el-container>
        <el-aside style="width: 200px; padding: 0.36rem">
          <el-select v-model="mysql.database" placeholder="请选择">
            <el-option
              v-for="db in databases"
              :key="db.Database"
              :label="db.Database"
              :value="db.Database">
            </el-option>
          </el-select>
          <el-table :data="tables" :height="250">
            <el-table-column prop="tableName" label="表">

            </el-table-column>
          </el-table>
        </el-aside>
        <el-main>
          <data-view :mysql="mysql" :tables="tables"/>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>
<script>
import dataView from './dataView.vue'
export default {
  name: 'mysql',
  components: {
    dataView
  },
  props: {
    mode: {
      type: String,
      default () {
        return 'create'
      }
    }
  },
  data () {
    return {
      mysql: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: ''
      }
    }
  },
  mounted () {
    // if (this.$props.mode === 'edit') {
      
    // }
  },
  methods: {
    connectMySQL () {
      this.$store.dispatch('connectMySQL', this.mysql)
    },
    getTables () {
      this.$store.dispatch('getTableFromDB', {
        config: this.mysql,
        sql: 'SHOW TABLES;'
      })
    }
  },
  watch: {
    currentDatabase (val) {
      if (val !== '' && this.mysql.password !== '') {
        this.getTables()
      }
    }
  },
  computed: {
    currentDatabase () {
      return this.mysql.database
    },
    databases () {
      return this.$store.state.mysql.databases
    },
    tables () {
      return this.$store.state.mysql.tables
    }
  }
}
</script>
<style>

</style>

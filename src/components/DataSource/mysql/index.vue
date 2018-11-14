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
      </el-aside>
      <el-main>

      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'mysql',
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
  methods: {
    connectMySQL () {
      this.$store.dispatch('connectMySQL', this.mysql)
    }
  },
  computed: {
    databases () {
      return this.$store.state.mysql.databases
    }
  }
}
</script>
<style>

</style>

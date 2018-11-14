<template>
  <div>
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
      <el-button size="small" type="primary"
      @click="requestData">请求数据服务</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'restful-api',
  data () {
    return {
      api: {
        host: 'localhost',
        port: '2018',
        service: '/api/data/titanic'
      }
    }
  },
  methods: {
    requestData () {
      this.$store.commit('setCurrentAPI', this.currentAPI)
      this.$store.commit('initState', ['currentAPI', 'page'])
      this.$store.dispatch('getMainData')
    }
  },
  computed: {
    currentAPI () {
      const { host, port, service } = this.api
      return `//${host}:${port}${service}`
    }
  }
}
</script>
<style>
</style>

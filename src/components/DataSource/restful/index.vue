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
  props: ['dsIndex'],
  data () {
    return {
      api: {
        host: 'localhost',
        port: '2018',
        service: '/api/data/titanic'
      }
    }
  },
  created () {
    if (this.dataSourceObj.foreignDB !== null) {
      const {host, port, service} = this.dataSourceObj.foreignDB
      this.api.host = host
      this.api.port = port
      this.api.service = service
    }
  },
  methods: {
    requestData () {
      if (this.dataSourceObj.foreignDB !== null) {
        this.$store.commit('updateRest', {
          dsIndex: this.$props.dsIndex,
          api: this.api
        })
      } else {
        this.$store.commit('createRest', {
          dsIndex: this.$props.dsIndex,
          api: this.api
        })
      }
      this.$store.dispatch('getRestData', {dsIndex: this.$props.dsIndex})

      // this.$store.commit('setCurrentAPI', this.currentAPI)
      // this.$store.commit('initState', ['currentAPI', 'page'])
      // this.$store.dispatch('getMainData')
    }
  },
  computed: {
    currentAPI () {
      const { host, port, service } = this.api
      return `//${host}:${port}${service}`
    },
    dataSourceObj () {
      return this.$store.state.database.dataSource[this.$props.dsIndex]
    }
  }
}
</script>
<style>
</style>

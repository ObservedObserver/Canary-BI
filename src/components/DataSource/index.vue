<template>
    <div class="datasource-container">
        dataSource Board
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
        <el-button @click="requestData">Get Data</el-button>
    </div>
</template>
<script>
export default {
  name: 'dataSource',
  data() {
    return {
      api: {
        host: 'localhost',
        port: '2018',
        service: '/api/data/titanic'
      }
    };
  },
  computed: {
    currentAPI () {
        const { host, port, service } = this.api
        return `//${host}:${port}${service}`
    }
  },
  watch: {
    currentAPI(val) {
      this.$store.commit('setCurrentAPI', val)
    }
  },
  methods: {
    requestData () {
        this.$store.commit('initState', ['currentAPI', 'page'])
        this.$store.dispatch('getMainData')
    }
  }
};
</script>

<style scoped>
.datasource-container {
  padding: 1rem;
}
</style>

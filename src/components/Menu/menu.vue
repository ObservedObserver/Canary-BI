<template lang="html">
  <el-menu class="el-menu-vertical-demo"
    background-color="#2f3538"
    text-color="#fff">
    <el-menu-item index="0" @click="gotoPage('Data')">
      <i class="el-icon-picture-outline"></i>
      <span slot="title">数据源</span>
    </el-menu-item>
    <el-menu-item index="1" @click="gotoPage('Main')">
      <i class="el-icon-picture-outline"></i>
      <span slot="title">Sheet</span>
    </el-menu-item>
    <el-menu-item index="2" @click="gotoPage('Dash')">
      <i class="el-icon-menu"></i>
      <span slot="title">DashBoard</span>
    </el-menu-item>
    <el-menu-item index="3" @click="goHome">
      <i class="el-icon-menu"></i>
      <span slot="title">返回主页</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'main-menu',
  data () {
    return {}
  },
  methods: {
    gotoPage (page) {
      // page = 'Dash' || 'Main' || 'DataSource'
      this.$store.commit('gotoPage', page)
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
.el-menu-vertical-demo{
  width: 146px;
  padding: 0px;
  min-height: 400px;
  height: 100%;
}
</style>

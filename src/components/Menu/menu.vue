<template lang="html">
  <el-menu class="el-menu-vertical-demo"
    background-color="rgb(0, 21, 41)"
    text-color="rgba(255, 255, 255, 0.65)">
    <el-menu-item index="0" @click="gotoPage('Data')">
      <i class="el-icon-picture-outline"></i>
      <span slot="title">数据源</span>
    </el-menu-item>
    <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">多维数据分析</span>
        </template>
        <el-menu-item index="1.1" @click="gotoPage('Main-1')">
          制作报表
        </el-menu-item>
        <el-menu-item index="1.2" @click="gotoPage('Main-2')">
          探索分析
        </el-menu-item>
      </el-submenu>
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
  width: 256px;
  position: fixed;
  top: 0px;
  bottom: 0px;
}
</style>

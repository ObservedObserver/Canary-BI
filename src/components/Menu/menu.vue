<template lang="html">
  <el-menu class="el-menu-vertical-demo"
    background-color="rgb(0, 21, 41)"
    text-color="rgba(255, 255, 255, 0.65)">
    <el-submenu index="0">
      <template slot="title">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">数据源</span>
      </template>
      <el-menu-item index="0.1" @click="gotoPage({primary: 'Data', secondary: 0})">
          本地文件
      </el-menu-item>
      <el-menu-item index="0.2" @click="gotoPage({primary: 'Data', secondary: 1})">
          Restful API
      </el-menu-item>
      <el-menu-item index="0.3" @click="gotoPage({primary: 'Data', secondary: 2})">
          MySQL
      </el-menu-item>
    </el-submenu>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">多维数据分析</span>
      </template>
      <el-menu-item index="1.1" @click="gotoPage({
        primary: 'Main',
        secondary: 0
      })">
        制作报表
      </el-menu-item>
      <el-menu-item index="1.2" @click="gotoPage({
        primary: 'Main',
        secondary: 1
      })">
        探索分析
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="2" @click="gotoPage({primary: 'Dash', secondary: 0})">
      <i class="el-icon-menu"></i>
      <span slot="title">仪表盘/看板</span>
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

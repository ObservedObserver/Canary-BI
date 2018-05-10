<template lang="html">
  <el-menu class="el-menu-vertical-demo"
    background-color="#2f3538"
    text-color="#fff">
    <el-menu-item index="0">
      <i class="el-icon-document"></i>
      <span slot="title">数据源</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">聚合模式</span>
      </template>
      <el-menu-item index="1-1">
        <span slot="title">状态</span>
        <el-switch
          v-model="dataAggregation"
          active-color="#69c8d9"
          inactive-color="#779398">
        </el-switch>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'main-menu',
  data () {
    return {
      dataAggregation: true
    }
  },
  watch: {
    dataAggregation (newVal) {
      this.$store.commit('changeAggregation', this.dataAggregation)
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

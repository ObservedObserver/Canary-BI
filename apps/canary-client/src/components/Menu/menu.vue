<template lang="html">
  <el-menu class="el-menu-vertical-demo"
    background-color="rgb(0, 21, 41)"
    text-color="rgba(255, 255, 255, 0.65)">
    <el-menu-item index="gohome" @click="goHome">
      <i class="el-icon-menu"></i>
      <span slot="title">返回主页</span>
    </el-menu-item>
    <el-submenu v-if="typeof item.submenu !== 'undefined'"
    v-for="item in menuRouter"
    :key="item.title"
    :index="item.title">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </template>
      <el-menu-item v-if="!!item.submenu"
      v-for="subItem in item.submenu"
      :key="subItem.title" :index="subItem.title"
      @click="gotoPage(subItem.location)"
      >
        {{subItem.title}}
      </el-menu-item>
    </el-submenu>
    <el-menu-item v-if="typeof item.submenu === 'undefined'"
    v-for="item in menuRouter"
    :key="item.title"
    :index="item.title"
    @click="gotoPage(item.location)"
    >
      <i :class="item.icon"></i>
      <span slot="title">{{item.title}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import menuRouter from './config.js'
export default {
  name: 'main-menu',
  data () {
    return {
      menuRouter
    }
  },
  methods: {
    gotoPage (location) {
      this.$store.commit('gotoPage', location)
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

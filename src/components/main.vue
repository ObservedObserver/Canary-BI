<template lang="html">
  <el-container class="vis-main-board" style="padding: 0px">
    <el-aside width="146px">
      <menu-board></menu-board>
    </el-aside>
    <el-main style="padding: 0px">
      <operators-board v-show="currentPage === 'Main'" />
      <dash-board v-if="currentPage === 'Dash'"/>
      <data-source v-show="currentPage === 'Data' " />
    </el-main>
  </el-container>
  <!-- <div class="vis-main-board">
    <menu-board></menu-board>
    <operators-board></operators-board>
  </div> -->
</template>

<script>
import OperatorsBoard from '@/components/Operators/main.vue'
import MenuBoard from '@/components/Menu/menu.vue'
import DashBoard from '@/components/DashBoard/index.vue'
import DataSource from '@/components/DataSource/index.vue'
export default {
  name: 'main-board',
  components: {
    OperatorsBoard,
    MenuBoard,
    DashBoard,
    DataSource
  },
  mounted () {
    // this.$store.dispatch('getMainData')
  },
  computed: {
    currentPage () {
      return this.$store.state.page
    }
  }
}
</script>

<style lang="css">
.vis-main-board{
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
}
::-webkit-scrollbar{
    width: 4px;
    height: 4px;
    background-color: rgba(0,0,0,0);
}
/*定义滚动条的轨道，内阴影及圆角*/
::-webkit-scrollbar-track{
    border-radius: 2px;
    background-color: rgba(0,0,0,0);
}
/*定义滑块，内阴影及圆角*/
::-webkit-scrollbar-thumb{
    /*width: 10px;*/
    height: 20px;
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
    background-color: rgba(255,255,255,0.5);
}
</style>

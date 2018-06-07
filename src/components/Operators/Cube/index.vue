<template lang="html">
  <el-card>
    <el-container>
      <el-aside width="160px" class="menu-tree">
        <i class="el-icon-arrow-left" @click="addPage"></i>
        <i class="el-icon-arrow-right" @click="minusPage"></i>
        <menu-tree :page="page" @get-nodes="changeNodes" />
      </el-aside>
      <el-main class="menu-board">
        <bar-chart :nodes="nodes" />
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
const PAGE_ROWS = 100
import menuTree from './menutree.vue'
import barChart from './Charts/barcharts.vue'
export default {
  name: 'cube-card',
  data () {
    return {
      page: 0,
      nodes: []
    }
  },
  methods: {
    addPage () {
      let maxPage = parseInt(this.dataLength / PAGE_ROWS)
      this.page = Math.min(this.page + 1, maxPage)
    },
    minusPage () {
      this.page = Math.max(this.page - 1, 0)
    },
    changeNodes (nodes) {
      this.nodes = nodes
    }
  },
  computed: {
    dataLength () {
      return this.$store.getters.labelTree.children.length
    }
  },
  components: {
    menuTree,
    barChart
  }
}
</script>

<style lang="css">
.menu-tree{
  max-height: 400px;
  overflow-y: auto;
  /* overflow-x: hidden; */
}
/* .menu-board{
  overflow-x: hidden;
} */
</style>

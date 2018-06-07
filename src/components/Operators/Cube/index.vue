<template lang="html">
  <el-card>
    <el-container>
      <el-aside width="160px" class="menu-tree">
        <i class="el-icon-arrow-left" @click="addPage"></i>
        <i class="el-icon-arrow-right" @click="minusPage"></i>
        <menu-tree :page="page" @get-nodes="changeNodes" />
      </el-aside>
      <el-main class="menu-board">
        <el-button-group>
          <el-button @click="minusLevel"
          size="mini" type="primary" icon="el-icon-arrow-up">上卷</el-button>
          <el-button @click="addLevel"
          size="mini" type="success">下钻<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        </el-button-group>
        <bar-chart :nodes="nodes" :level="level" />
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
import menuTree from './menutree.vue'
import barChart from './Charts/barcharts.vue'
const PAGE_ROWS = 100
export default {
  name: 'cube-card',
  data () {
    return {
      page: 0,
      nodes: [],
      level: 0
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
      let {dimensions} = this.$store.getters.biLabels
      this.level = dimensions.length
      this.nodes = nodes
    },
    addLevel () {
      let {dimensions} = this.$store.getters.biLabels
      // this.level = Math.min(this.level + 1, dimensions.length - 1)
      this.level = Math.min(this.level + 1, dimensions.length)
    },
    minusLevel () {
      this.level = Math.max(this.level - 1, 0)
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

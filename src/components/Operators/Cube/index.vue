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
        <bar-chart v-if="cid === 1" :nodes="nodes" :level="level" :save="save" @processSave="submitSave" />
        <line-chart v-if="cid === 2" :nodes="nodes" :level="level" :save="save" @processSave="submitSave" />
        <pie-chart v-if="cid === 3" :nodes="nodes" :level="level" :save="save" @processSave="submitSave" />
        <scatter-chart v-if="cid === 4" :nodes="nodes" :level="level" :save="save" @processSave="submitSave" />
        <el-row>
          <el-button type="warning" @click="saveChart">保存</el-button>
        </el-row>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
import menuTree from './menutree.vue'
import barChart from './Charts/barcharts.vue'
import lineChart from './Charts/linecharts.vue'
import pieChart from './Charts/pieCharts.vue'
import scatterChart from './Charts/scatter.vue'
import heatMap from './Charts/heatmap.vue'
const PAGE_ROWS = 100
export default {
  name: 'cube-card',
  props: {
    cid: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      page: 0,
      nodes: [],
      level: 0,
      save: false
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
    },
    saveChart () {
      this.save = true
    },
    submitSave (option) {
      // console.log('save', {
      //   name: 'tmp',
      //   option
      // })
      this.$store.commit('saveChart', option)
      this.save = false
    }
  },
  computed: {
    dataLength () {
      return this.$store.getters.labelTree.children.length
    }
  },
  components: {
    menuTree,
    barChart,
    lineChart,
    pieChart,
    scatterChart,
    heatMap
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

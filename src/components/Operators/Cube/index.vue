<template lang="html">
  <el-card>
    <el-container>
      <el-aside width="160px" class="menu-tree">
        <i class="el-icon-arrow-left" @click="addPage"></i>
        <i class="el-icon-arrow-right" @click="minusPage"></i>
        <el-button-group>
          <el-button size="mini" @click="chooseAllNodes">全选</el-button>
          <el-button size="mini" @click="clearAllNodes">反选</el-button>
        </el-button-group>
        <menu-tree ref="menuTree" :page="page" @get-nodes="changeNodes" />
      </el-aside>
      <el-main class="menu-board">
        <el-button-group>
          <el-button @click="minusLevel"
          size="mini" type="primary" icon="el-icon-arrow-up">上卷</el-button>
          <el-button @click="addLevel"
          size="mini" type="success">下钻<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        </el-button-group>
        <bar-chart v-if="cid === 2" :nodes="nodes" :level="level" :save="save" @processSave="submitSave" />
        <line-chart v-if="cid === 3" :nodes="nodes" :level="level" :save="save" @processSave="submitSave" />
        <pie-chart v-if="cid === 4" :nodes="nodes" :level="level" :save="save" @processSave="submitSave" />
        <scatter-chart v-if="cid === 5" :nodes="nodes" :level="level" :save="save" @processSave="submitSave" />
        <scatter-map v-if="cid === 6" :nodes="nodes" :level="level" :save="save" @processSave="submitSave" />
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
import pieChart from './Charts/piecharts.vue'
import scatterChart from './Charts/scatter.vue'
import scatterMap from './Charts/map.vue'
import deepcopy from 'deepcopy'
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
      level: 1,
      save: false,
      transposition: false,
      preLabels: {
        dimensions: [],
        measures: []
      }
    }
  },
  methods: {
    chooseAllNodes () {
      console.log('choose all nodes')
      this.$refs.menuTree.chooseAllNodes()
    },
    clearAllNodes () {
      this.$refs.menuTree.clearAllNodes()
    },
    addPage () {
      let maxPage = parseInt(this.dataLength / PAGE_ROWS)
      this.page = Math.min(this.page + 1, maxPage)
    },
    minusPage () {
      this.page = Math.max(this.page - 1, 0)
    },
    changeNodes (nodes) {
      // let {dimensions} = this.$store.getters.biLabels
      // this.level = dimensions.length
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
      this.$prompt('请输入标题', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: value + '图表成功生成'
        })
        option.title.text = value
        this.$store.commit('saveChart', option)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消生成图表'
        })
      })
      this.save = false
    }
  },
  computed: {
    dataLength () {
      return this.$store.getters.labelTree.children.length
    },
    biLabels () {
      return this.$store.getters.biLabels
    },
    filters () {
      return this.$store.state.filters
    }
  },
  watch: {
    biLabels () {
      // 这部分代码可以通过在store中数据变化时做浅拷贝使得biLabels一定在变化时触发来简化代码
      console.log('bilabels change caught', this.preLabels, this.biLabels)
      let same = true
      let {dimensions, measures} = this.biLabels
      if (dimensions.length !== this.biLabels.dimensions || measures.length !== this.biLabels.measures) {
        same = false
      } else {
        dimensions.forEach((dim, index) => {
          if (this.preLabels.dimesions[index] !== dim) {
            same = false
          }
        })
        measures.forEach((mea, index) => {
          if (this.preLabels.measures[index] !== mea) {
            same = false
          }
        })
      }
      console.log('same', same)
      if (!same) {
        this.chooseAllNodes()
      }

      this.preLabels = deepcopy(this.biLabels)
    },
    filters () {
      console.log('filters change caught')
      this.chooseAllNodes()
    }
  },
  mounted () {
    this.chooseAllNodes()
  },
  components: {
    menuTree,
    barChart,
    lineChart,
    pieChart,
    scatterChart,
    scatterMap
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

<template lang="html">
  <div class="dash-board">
    <div class="dashboard-info">
      <el-row>
        <el-col :span="16">
          <el-button size="small" type="success" @click="updateDashBoard">保存修改</el-button>
          <el-button size="small" type="warning" @click="gotoBoardCenter">返回</el-button>
          <el-button size="small" type="primary" @click="connectHotData">连接热数据</el-button>
          <el-button size="small" type="danger" @click="clearFilters">清空筛选器</el-button>
          <el-switch
            v-model="filterMode"
            active-text="显示筛选器配置">
          </el-switch>
        </el-col>
        <el-col :span="8">{{currentBoard.title}}</el-col>
      </el-row>
    </div>
    <chart-list :boardIndex="boardIndex" />
    <div>
      <grid-layout
        :layout.sync="dashBoard.segmentList"
        :col-num="12"
        :row-height="300"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[0, 0]"
        :use-css-transforms="true"
      >
        <grid-item v-for="(segment, index) in dashBoard.segmentList"
          :key="segment.i"
          :x="segment.x"
          :y="segment.y"
          :w="segment.w"
          :h="segment.h"
          :i="segment.i">
            <div class="chart-container">
              <el-switch v-if="filterMode === true"
                v-model="dashBoard.setFilterList[index]"
                @change="(value) => {setAsFilter(value, index)}"
                active-text="设为筛选器">
              </el-switch>
                <renderer style="width: 100%; height: 100%"
                  :event="true"
                  :boardIndex="boardIndex"
                  :boardFilter="boardFilter"
                  :setFilter="dashBoard.setFilterList[index]"
                  :width="segment.w"
                  :height="segment.h * 300"
                  :chart="dashBoard.vizList[index]" />
            </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import ChartList from './list.vue'
import renderer from '@/components/Operators/vizController/renderer.vue'
export default {
  name: 'dash-board',
  props: ['boardIndex'],
  data () {
    return {
      dashBoard: {
        segmentList: [],
        vizList: [],
        setFilterList: []
      },
      interval: null,
      filterMode: false
    }
  },
  mounted () {
    let board = this.$store.state.dashBoardList[this.$props.boardIndex]
    this.dashBoard.segmentList = board.segmentList.map(segment => {
      return {
        x: segment.container.x,
        y: segment.container.y,
        w: segment.container.w,
        h: segment.container.h,
        i: segment.container.i
      }
    })
    this.dashBoard.vizList = board.segmentList.map(segment => {
      return segment.chart
    })
    this.dashBoard.setFilterList = board.segmentList.map(segment => {
      return segment.setFilter
    })
  },
  beforeDestroy () {
    if (this.interval !== null) {
      clearInterval(this.interval)
      this.interval = null
    }
  },
  methods: {
    updateDashBoard () {
      let boardIndex = this.$props.boardIndex
      this.$store.commit('updateDashBoardContainer', {
        boardIndex,
        containerList: this.dashBoard.segmentList
      })
      this.$store.dispatch('updateDashBoard', {
        boardIndex
      })
    },
    gotoBoardCenter () {
      this.$emit('gotoCenter')
    },
    connectHotData (t = 5) {
      this.interval = setInterval(() => {
        console.log('hot data', this)
        this.$store.dispatch('getDashBoardData', {
          boardIndex: this.$props.boardIndex
        })
      }, 5000)
    },
    setAsFilter (value, index) {
      console.log(value, index)
      this.$store.commit('setSegmentFilter', {
        boardIndex: this.$props.boardIndex,
        segmentIndex: index,
        setFilter: value
      })
    },
    clearFilters () {
      this.$store.commit('setDashBoardFilters', {
        boardIndex: this.$props.boardIndex,
        filters: []
      })
    }
  },
  computed: {
    segmentList () {
      return this.dashBoard.segmentList
    },
    globalSegmentList () {
      return this.$store.state.dashBoardList[this.$props.boardIndex].segmentList
    },
    currentBoard () {
      return this.$store.state.dashBoardList[this.$props.boardIndex]
    },
    boardFilter () {
      return this.currentBoard.filters
    }
  },
  watch: {
    globalSegmentList (val) {
      let board = this.$store.state.dashBoardList[this.$props.boardIndex]
      this.dashBoard.segmentList = board.segmentList.map(segment => {
        return {
          x: segment.container.x,
          y: segment.container.y,
          w: segment.container.w,
          h: segment.container.h,
          i: segment.container.i
        }
      })
      this.dashBoard.vizList = board.segmentList.map(segment => {
        return segment.chart
      })
    }
  },
  components: {
    VueGridLayout,
    ChartList,
    renderer
  }
}
</script>

<style lang="css" scoped>
.dash-board {
  padding: 1rem;
}
.chart-container{
  /* padding: 1rem 1rem;
  margin: 1rem 1rem;
  height: 100%;
  width: 100%; */
  position:absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  right: 4px;
  padding: 4px;
  border: 1px solid #f5f5f5;
  border-radius: 3px;
  box-shadow: 0px 1px 3px 3px #f5f5f5;
  background-color: #fff;
}
.sub-chart {
  height: 100%;
  width: 100%;
  min-width: 100px;
  min-height: 50px;
}
.el-card.sub-chart.is-always-shadow .el-card__body{
  height: 92%;
  padding-bottom: 4%;
  padding-top: 4%;
}
.auto-size-chart{
  width: 100%;
  height: 100%;
  min-height: 50px;
}
.echarts {
  width: 100%;
  height: 100%;
  min-height: 50px;
}
.dashboard-info{
  padding: 0.4rem;
}
</style>

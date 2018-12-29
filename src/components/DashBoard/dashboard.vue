<template lang="html">
  <div class="dash-board">
    <div class="dashboard-info">
      <el-row>
        <el-col :span="8">
          <el-button type="success" @click="updateDashBoard">保存修改</el-button>
          <el-button type="warning" @click="gotoBoardCenter">返回</el-button>
        </el-col>
        <el-col :span="8">{{currentBoard.title}}</el-col>
        <el-col :span="8"></el-col>
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
                <renderer style="width: 100%; height: 100%"
                  :width="segment.w"
                  :height="segment.h * 300"
                  :vizJson="dashBoard.vizList[index]" />
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
        vizList: []
      }
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
  },
  methods: {
    updateDashBoard () {
      this.$store.commit('updateDashBoardContainer', {
        boardIndex: this.$props.boardIndex,
        containerList: this.dashBoard.segmentList
      })
    },
    gotoBoardCenter () {
      this.$emit('gotoCenter')
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

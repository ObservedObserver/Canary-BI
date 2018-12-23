<template lang="html">
  <div class="dash-board">
    <!-- <el-card class="sub-chart" v-for="option in dashBoards" :key="option.id">
      <chart :options="option" style="width:100%;height: 400px" />
    </el-card> -->
    <!-- <draggable v-model="dashBoards" @start="drag=true" @end="drag=false">
       <el-card class="sub-chart" v-for="option in dashBoards" :key="option.id">
         <chart :options="option" style="width:100%;height: 400px" />
       </el-card>
    </draggable> -->
    <chart-list :boardIndex="boardIndex" />
    <grid-layout
      :layout="dashBoard"
      :col-num="12"
      :row-height="300"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[0, 0]"
      :use-css-transforms="true"
    >
      <grid-item v-for="item in dashBoard"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i">
          <div class="chart-container">
              <chart class="auto-size-chart" :auto-resize="true" :options="item.option" />
          </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import ChartList from './list.vue'
export default {
  name: 'dash-board',
  data () {
    return {
      dashBoard: this.$store.state.dashBoard
    }
  },
  mounted () {
    this.dashBoard = this.$store.state.dashBoard
  },
  methods: {
    updateDashBoard () {
      this.$store.commit('updateList', this.dashBoard)
    }
  },
  computed: {
    boardIndex () {
      return this.$store.state.currentDashboard
    }
  },
  components: {
    VueGridLayout,
    ChartList
  }
}
</script>

<style lang="css" scoped>
.dash-board {
  padding: 1rem;
}
.chart-container{
  padding: 1rem 1rem;
  margin: 1rem 1rem;
  height: 82%;
  width: 98%;
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
</style>

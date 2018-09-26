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
          <el-card class="sub-chart">
            <chart :auto-resize="true" :options="item.option" style="width:100%;height:236px" />
          </el-card>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
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
  components: {
    VueGridLayout
  }
}
</script>

<style lang="css" scoped>
.dash-board {
  padding: 1rem;
}
.sub-chart {
  margin: 1rem;
}
</style>

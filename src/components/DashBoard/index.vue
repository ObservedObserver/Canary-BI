<template lang="html">
  <div class="dash-board">
    <!-- <el-card class="sub-chart" v-for="option in dashBoards" :key="option.id">
      <chart :options="option" style="width:100%;height: 400px" />
    </el-card> -->
    <draggable v-model="dashBoards" @start="drag=true" @end="drag=false">
       <el-card class="sub-chart" v-for="option in dashBoards" :key="option.id">
         <chart :options="option" style="width:100%;height: 400px" />
       </el-card>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'dash-board',
  computed: {
    dashBoards: {
      get () {
        return this.$store.state.dashBoard
      },
      set (value) {
        this.$store.commit('updateList', value)
      }
    }
  },
  components: {
    draggable
  }
}
</script>

<style lang="css" scoped>
.dash-board{
  padding: 1rem;
}
.sub-chart{
  margin: 1rem;
}
</style>

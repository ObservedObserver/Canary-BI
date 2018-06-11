<template lang="html">
  <div class="dash-board">
    <el-card class="sub-chart" v-for="option in dashBoards" :key="option.id" width="100%">
      <chart :options="option" />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'dash-board',
  computed: {
    dashBoards () {
      return this.$store.state.dashBoard
    }
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

<template>
  <el-collapse value="charts">
    <el-collapse-item title="图表仓库" name="charts">
      <div style="max-height:400px;overflow:auto">
        <div v-for="(chart, index) in chartList" :key="index" class="chart-box">
          <el-button @click="addSegment(chart, index)" icon="el-icon-star-off" circle></el-button>
          <renderer :vizJson="chart" />
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
import renderer from '@/components/Operators/vizController/renderer.vue'
export default {
  name: 'chart-warehouse-list',
  components: {
    renderer
  },
  props: ['boardIndex'],
  computed: {
    chartList () {
      return this.$store.state.chartWarehouse
    }
  },
  methods: {
    addSegment (chart, index) {
      console.log('addSegment')
      let dsIndex = chart.dsIndex
      let chartIndex = index
      let boardIndex = this.$props.boardIndex || 0
      this.$store.commit('addSegment', {boardIndex, chartIndex, dsIndex})
    }
  }
}
</script>
<style scoped>
.chart-box{
  width: 300px;
  height: 200px;
  /* display: inline-block; */
  /* float: right; */
}
</style>

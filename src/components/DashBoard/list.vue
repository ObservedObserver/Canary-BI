<template>
  <el-collapse value="charts">
    <el-collapse-item title="图表仓库" name="charts">
      <div style="max-height:400px;overflow:auto">
        <div v-for="(chart, index) in chartList" :key="index" class="chart-box">
          <el-card style="margin: 1rem">
            <div style="width: 280; height: 180px; overflow: hidden">
              <renderer style="width: 280; height: 240px;" :vizJson="chart" />
            </div>
            <div style="padding: 0.7rem;">
              <el-button size="small" type="primary" @click="addSegment(chart, index)"
                icon="el-icon-goods">Add to Dashboard</el-button>
            </div>
          </el-card>
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
  height: 300px;
  /* display: inline-block; */
  float: left;
}
</style>

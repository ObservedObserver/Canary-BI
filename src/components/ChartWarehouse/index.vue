<template>
  <div>
    <el-card v-for="(chart, index) in chartList" :key="index">
      <el-row>
        <el-col :span="18" class="chart-in-warehouse">
          <renderer :chart="chart" />
        </el-col>
        <el-col :span="6">
          dataSource Config: {{chart.title}}
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import renderer from '@/components/Operators/vizController/renderer.vue'
export default {
  name: 'chart-warehouse',
  components: {
    renderer
  },
  computed: {
    chartList () {
      return this.$store.state.chartWarehouse
    }
  }
}
</script>
<style scoped>
  .chart-in-warehouse{
    height: 400px
  }
</style>

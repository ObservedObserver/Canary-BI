<template lang="html">
  <el-card class="box-card">
    Total Rows: {{totalRowNumber}}
    <el-collapse>
      <!-- <el-collapse-item title="全部">
        <drag-area class="indata" area-name="data"></drag-area>
      </el-collapse-item> -->
      <el-collapse-item title="维度">
        <drag-area class="init-box" area-name="dimensions"></drag-area>
      </el-collapse-item>
      <el-collapse-item title="度量">
        <drag-area class="init-box" area-name="measures"></drag-area>
      </el-collapse-item>
      <el-collapse-item title="时间维度">
        <drag-area class="init-box" area-name="time"></drag-area>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import dragArea from './dragarea.vue'

export default {
  name: 'data-board',
  data () {
    return {
      name: 'data'
    }
  },
  computed: {
    totalRowNumber () {
      return this.$store.state.globalData.length
    }
  },
  components: {
    dragArea
  }
}
</script>

<style lang="css" scoped>
.indata{
  height: 12rem;
  max-height: 16rem;
  overflow-y: auto;
}
.init-box{
  height: 4rem;
  max-height: 16rem;
  overflow-y: auto;
}
.box-card{
  margin: 0.6rem;
}
</style>

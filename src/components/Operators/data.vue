<template lang="html">
  <el-card class="box-card">
    <el-collapse>
      <el-collapse-item :title="name">
        <drag-area class="indata" area-name="data"></drag-area>
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
.box-card{
  margin: 0.6rem;
}
</style>

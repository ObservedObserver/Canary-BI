<template>
  <el-card class="box-card">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="列维度" name="1">
        <drag-area area-name="X" class="inSelected"></drag-area>
      </el-collapse-item>
      <el-collapse-item title="行维度" name="2">
        <drag-area area-name="Y" class="inSelected"></drag-area>
      </el-collapse-item>
      <el-collapse-item title="度量" name="3">
        <drag-area area-name="value" class="inSelected"></drag-area>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script>
import dragArea from '../dragarea.vue'
export default {
  name: 'selected-data',
  data () {
    return {
      activeNames: []
    }
  },
  components: {
    dragArea
  }
}
</script>
<style>
.inSelected{
  height: 4rem;
  max-height: 16rem;
  overflow-y: auto;
}
.box-card{
  margin: 0.6rem;
}
</style>

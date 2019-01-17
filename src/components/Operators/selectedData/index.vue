<template>
  <el-card class="box-card">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="维度" name="1">
        <drag-area area-name="X" class="inSelected"></drag-area>
      </el-collapse-item>
      <!-- <el-collapse-item title="行维度" name="2">
        <drag-area area-name="Y" class="inSelected"></drag-area>
      </el-collapse-item> -->
      <el-collapse-item title="度量" name="3">
        <drag-area area-name="value" class="inSelected"></drag-area>
      </el-collapse-item>
      <el-collapse-item title="颜色" name="4">
        <drag-area area-name="color" class="inSelected"></drag-area>
      </el-collapse-item>
      <el-collapse-item title="形状" name="5">
        <drag-area area-name="shape" class="inSelected"></drag-area>
      </el-collapse-item>
      <el-collapse-item title="大小" name="6">
        <drag-area area-name="size" class="inSelected"></drag-area>
      </el-collapse-item>
      <el-collapse-item title="透明度" name="7">
        <drag-area area-name="opacity" class="inSelected"></drag-area>
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

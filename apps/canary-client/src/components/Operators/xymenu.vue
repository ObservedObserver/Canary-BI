<template lang="html">
  <div>
    <el-row>
      <el-col :span="12" class="xymenu">
        <drag-area area-name="X" title="X" class="inxy"></drag-area>
      </el-col>
      <el-col :span="12" class="xymenu">
        <drag-area area-name="Y" title="Y" class="inxy"></drag-area>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="xymenu">
        <drag-area area-name="value" title="value" class="inxy"></drag-area>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dragArea from './dragarea.vue'

export default {
  name: 'xymenu',
  data () {
    return {}
  },
  components: {
    dragArea
  }
}
</script>

<style lang="css">
.xymenu{
  min-height: 3.8rem;
  padding: 0.3rem;
  overflow-x: auto;
  border: 1px solid rgba(34, 36, 38, 0.15);
  box-shadow: 0px 1px 2px 0 rgba(34, 36, 38, 0.15);
}
.inxy{
  min-height: 3.2rem;
}
</style>

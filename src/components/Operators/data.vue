<template lang="html">
  <el-card class="box-card">
    <el-collapse>
      <el-collapse-item :title="name">
        <drag-area class="indata" area-name="data"></drag-area>
      </el-collapse-item>
    </el-collapse>
    <!-- <div>
      <drag-area class="ui basic segment indata" area-name="data"></drag-area>
    </div> -->
  </el-card>
  <!-- <div class="ui segment">

    <h3 class="ui header">{{name}}</h3>
    <i class="ui large angle link icon" id="data-hider"
    :class="hider[hiderStatus]"
    @click="changeHiderStatus"></i>
    <div v-if="!hiderStatus">
      <div class="ui divider"></div>
      <drag-area class="ui basic segment indata" area-name="data"></drag-area>
    </div>
  </div> -->
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

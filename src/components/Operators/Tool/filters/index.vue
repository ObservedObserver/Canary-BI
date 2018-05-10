<template lang="html">
  <el-card class="box-card">
    <el-collapse>
      <el-collapse-item title="Filters">
        <drag-area class="infilter" area-name="filter" />
        <collapse :labels="labels" />
      </el-collapse-item>
    </el-collapse>
    <!-- <div>
      <drag-area class="ui basic segment indata" area-name="data"></drag-area>
    </div> -->
  </el-card>
  <!-- <div class="ui segment">
    <h3 class="ui header">Filters</h3>
    <i class="ui large angle link icon" id="filter-hider"
    :class="filterHider[filterStatus]"
    @click="changeFilterStatus"></i>
    <div v-if="!filterStatus">
      <div class="ui divider"></div>
      <drag-area class="ui basic segment infilter" area-name="filter" />
      <collapse :labels="labels" />
    </div>
  </div> -->
</template>

<script>
import collapse from './collapse.vue'
import dragArea from '../../dragarea.vue'
export default {
  name: 'bi-filters',
  computed: {
    labels () {
      return this.$store.state.globalDataLabels.filter
    }
  },
  data () {
    return {}
  },
  components: {
    collapse,
    dragArea
  }
}
</script>

<style lang="css">
.infilter{
  height: 6rem;
}
.box-card{
  margin: 0.6rem;
}
</style>

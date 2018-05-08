<template lang="html">
  <div class="ui segment">
    <h3 class="ui header">Filters</h3>
    <i class="ui large angle link icon" id="filter-hider"
    :class="filterHider[filterStatus]"
    @click="changeFilterStatus"></i>
    <div v-if="!filterStatus">
      <div class="ui divider"></div>
      <drag-area class="ui basic segment infilter" area-name="filter" />
      <collapse :labels="labels" />
    </div>
  </div>
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
    return {
      filterHider: ['down', 'left'],
      filterStatus: 1
    }
  },
  methods: {
    changeFilterStatus () {
      this.filterStatus = (this.filterStatus + 1) % 2
    },
  },
  components: {
    collapse,
    dragArea
  }
}
</script>

<style lang="css">
.ui.basic.segment.infilter{
  height: 6rem;
}
#filter-hider{
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>

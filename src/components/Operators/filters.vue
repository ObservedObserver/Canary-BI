<template lang="html">
  <div class="ui segment">
    <h3 class="ui header">{{name}}</h3>
    <button type="button" class="ui teal tiny button" @click="showModal">check</button>
    <div class="ui divider"></div>
    <drag-area class="ui basic segment infilter" area-name="filter"></drag-area>

    <div class="ui active modal" v-if="modalStatus">
      <div class="header">Header</div>
      <div class="content">
        <div class="ui segment" v-for="(list, i) in uiCheckedList" :key="list.id">
          <h5 class="ui header">{{list.dimension}}</h5>
          <div class="ui toggle checkbox" v-for="(option, j) in list.value" :key="option.id">
            <input type="checkbox" name="public" :value="checkedList[i].value[j]" v-model="checkedList[i].value">
            <label>{{option}}</label>
          </div>
        </div>
      </div>
      <div class="actions">
        <button class="ui green button" type="button" @click="runFilter">Submit</button>
        <div class="ui red button" @click="hideModal">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
import dragArea from './dragarea.vue'
export default {
  name: 'filter-board',
  data () {
    return {
      name: 'filter',
      modalStatus: false,
      dataLabels: this.$store.state.globalDataLabels.filter,
      checkedList: this.$store.state.filterCheckedList,
      uiCheckedList: this.$store.state.filterCheckedList
    }
  },
  methods: {
    showModal () {
      var i, paras
      paras = []
      for (i = 0; i < this.dataLabels.length; i++) {
        paras.push(this.dataLabels[i].name)
      }
      // console.log('paras', paras)
      this.$store.commit('filterStatistics', paras)
      this.checkedList = this.$store.state.filterCheckedList
      this.uiCheckedList = JSON.parse(JSON.stringify(this.$store.state.filterCheckedList))
      // console.log(this.$store.state.filterStatistics === this.filterStatistics)
      this.modalStatus = true
    },
    hideModal () {
      this.modalStatus = false
    },
    runFilter () {
      this.modalStatus = false
      console.log(this.checkedList)
      this.$store.commit('getFilterData', this.checkedList)
    }
  },
  computed: {
    filterStatistics () {
      return this.$store.getters.filterStatistics
    }
    // checkedList () {
    //   return this.$store.state.filterCheckedList
    // }
  },
  components: {
    dragArea
  }
}
</script>

<style lang="css" scoped>
.ui.basic.segment.infilter{
  height: 6rem;
}
</style>

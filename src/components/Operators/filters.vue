<template lang="html">
  <div class="ui segment">
    <h3 class="ui header">{{name}}</h3>
    <button type="button" class="ui teal tiny button" @click="showModal">check</button>
    <div class="ui divider"></div>
    <drag-area class="ui basic segment infilter" area-name="filter"></drag-area>

    <div class="ui active modal" v-if="modalStatus">
      <div class="header">Header</div>
      <div class="content" id="filter-content">
        <div class="ui segment" v-for="(list, i) in uiCheckedList" :key="list.id">
          <h5 class="ui header">{{list.dimension}}</h5>
          <div v-if="list.type === 'string'">
            <div class="ui toggle checkbox" v-for="(option, j) in list.value" :key="option.id">
              <input type="checkbox" name="public" :value="uiCheckedList[i].value[j]" v-model="checkedList[i].value">
              <label>{{option}}</label>
            </div>
          </div>
          <div v-if="list.type === 'number'">
            <range :fid="i" :extremum="getRange(i)"></range>
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
import range from './Tool/range.vue'
export default {
  name: 'filter-board',
  data () {
    return {
      name: 'filter',
      modalStatus: false,
      dataLabels: this.$store.state.globalDataLabels.filter,
      checkedList: this.$store.state.filterStatistics,
      uiCheckedList: this.$store.state.filterStatistics
    }
  },
  methods: {
    getRange (i) {
      return this.uiCheckedList[i].value
    },
    showModal () {
      var i, paras
      paras = []
      for (i = 0; i < this.dataLabels.length; i++) {
        paras.push(this.dataLabels[i].name)
      }
      // console.log('paras', paras)
      this.$store.commit('filterStatistics', paras)
      this.checkedList = this.$store.state.filterStatistics
      this.uiCheckedList = JSON.parse(JSON.stringify(this.$store.state.filterStatistics))
      // console.log(this.$store.state.filterStatistics === this.filterStatistics)
      this.modalStatus = true
    },
    hideModal () {
      this.modalStatus = false
    },
    runFilter () {
      this.modalStatus = false
      console.log(this.checkedList, 'runfilter')
      this.$store.commit('getFilterData', this.checkedList)
      // this.$store.commit('transFilterData', this.$store.getters.transData)
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
    dragArea,
    range
  }
}
</script>

<style lang="css" scoped>
.ui.basic.segment.infilter{
  height: 6rem;
}
.ui.modal{
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.88;
}
#filter-content{
  max-height: 600px;
  overflow-y: auto;
}
</style>

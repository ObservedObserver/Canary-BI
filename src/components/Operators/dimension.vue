<template lang="html">
  <div class="ui segment">
    <h3 class="ui header">{{name}}</h3>
    <div class="ui three item labeled icon menu">
      <div class="item"
      v-for="(dim, i) in dimensionLabels"
      :key="dim.id"
      @dragover="allowDrag"
      @drop="drop($event ,i)"
      >
        <i class="ui big icon" :class="dim.style"></i>
        {{dim.name}}
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="ui label" v-for="label in dataLabels" :key="label.id"
    :class="{
      teal: label.type === 'string',
      blue: label.type === 'number'
      }">
      <i class="ui icon" :class="label.label.style">{{label.label.name}}</i>
      {{label.name}}
      <div class="detail">
        {{label.type}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dimension',
  data () {
    return {
      name: 'dimension',
      dimensionLabels: this.$store.state.dimensionLabels
      // dataLabels: this.$store.state.globalDataLabels.dimension
    }
  },
  methods: {
    allowDrag (event) {
      event.preventDefault()
    },
    drop (event, i) {
      this.$store.commit('drop', {
        event: event,
        component: this.name,
        index: i
      })
      // this.dataLabels[this.dataLabels.length - 1].label = this.dimensionLabels[i]
      // 存在更新延时
    }
  },
  computed: {
    dataLabels () {
      return this.$store.getters.globalDimensionLabels
    }
  }
}
</script>

<style lang="css">
.ui.basic.segment.indimension{
  height: 6rem;
}
.ui.label{
  margin: 0.28rem;
}
</style>

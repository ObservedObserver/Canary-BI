<template lang="html">
  <div class="ui inverted vertical labeled icon left fixed menu">
    <a class="item" v-for="(item, i) in leftMenu" :key="i"><i class="icon" :class="item.icon"></i> {{item.name}} </a>
    <a class="item" @click="changeAggregation">
      <i class="ui icon" :class="{sun: dataAggregation, moon: !dataAggregation}"></i>
      聚合{{dataAggregation ? '开启' : '关闭'}}
    </a>
  </div>
</template>

<script>
export default {
  name: 'main-menu',
  data () {
    return {
      leftMenu: [
        {
          name: '预留',
          icon: 'idea'
        },
        {
          name: '预留',
          icon: 'sidebar'
        },
        {
          name: '预留',
          icon: 'compress'
        }
      ],
      dataAggregation: true
    }
  },
  methods: {
    changeAggregation () {
      this.dataAggregation = !this.dataAggregation
      this.$store.commit('changeAggregation', this.dataAggregation)
    }
  }
}
</script>

<style lang="css">
</style>

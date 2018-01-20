<template lang="html">
  <div class="ui inverted vertical labeled icon left fixed menu">
    <a class="item" v-for="(item, i) in leftMenu" :key="i"><i class="icon" :class="item.icon"></i> {{item.name}} </a>
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
      ]
    }
  }
}
</script>

<style lang="css">
</style>

<template lang="html">
  <div class="ui segment">
    <h3 class="ui header">Statistics</h3>
    <div class="ui divider"></div>
    <div class="ui form">
      <div class="grouped fields">
        <label>functions available</label>
        <div class="field" v-for="item in func" :key="item.id">
          <div class="ui slider checkbox">
            <input type="radio" :value="item" v-model="picked">
            <label>{{item}}</label>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'statistics',
  data () {
    return {
      func: this.$store.state.func
    }
  },
  computed: {
    picked: {
      get (val) {
        return this.$store.state.pickedFunc
      },
      set (val) {
        this.$store.commit('changeFunc', val)
        return this.$store.state.pickedFunc
      }
    }
  }
}
</script>

<style lang="css">
</style>

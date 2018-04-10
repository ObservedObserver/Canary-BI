<template lang="html">
  <div>
    {{data}}
  </div>
  <!-- <table class="ui table">
    <thead>

    </thead>
  </table> -->
</template>

<script>
export default {
  name: 'better-table',
  computed: {
    data () {
      return JSON.stringify(this.$store.getters.jsonTransData)
    },
    datasets () {
      return this.$store.getters.jsonTransData
    }
  }
}
</script>

<style lang="css">
</style>

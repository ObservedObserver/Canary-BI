<template lang="html">
  <div >
    {{data}}
  </div>
</template>

<script>
export default {
  name: 'better-table',
  computed: {
    data () {
      return JSON.stringify(this.$store.getters.jsonTransData)
    }
  }
}
</script>

<style lang="css">
</style>

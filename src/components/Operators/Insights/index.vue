<template>
  <div id="canary-voyager" ref="voyager">
  </div>
</template>

<script>
import * as voyager from 'datavoyager/build/lib-voyager.js'
export default {
  name: 'insights',
  data () {
    return {}
  },
  mounted () {
    this.container = document.getElementById('canary-voyager')
    this.config = undefined
    console.log(voyager, this.container)
    this.voyager = voyager.CreateVoyager(this.container,
      {
        showDataSourceSelector: false,
        serverUrl: null,
        hideHeader: true,
        hideFooter: true,
        relatedViews: 'initiallyShown',
        wildcards: 'disabled'
      },
      {
        values: this.dataSource
      }
    )
  },
  computed: {
    dataSource () {
      return this.$store.state.globalData
    }
  },
  watch: {
    dataSource (newVal) {
      this.voyager.updateData({
        values: newVal
      })
    }
  }
}
</script>
<style>
  @import 'datavoyager/build/style.css';
</style>

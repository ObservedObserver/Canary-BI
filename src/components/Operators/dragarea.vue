<template lang="html">
  <div class="drag-container" @dragover="allowDrag($event)" @drop="drop($event)">
    {{title}}
    <span class="label-container"
    v-for="(label, i) in dataLabels"
    draggable="true"
    @dragstart="drag($event, i)"
    :key="label.name">
      <el-tag :type=" label.type === 'string' ? undefined : 'success' ">
        {{label.name}} | {{label.type}}
      </el-tag>
    </span>
  </div>
</template>

<script>
export default {
  name: 'dragarea',
  props: {
    areaName: {
      type: String
    },
    title: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      // name: this.$props.areaName,
      // dataLabels: this.$store.state.globalDataLabels[this.$props.areaName]
    }
  },
  computed: {
    dataLabels () {
      return this.$store.state.globalDataLabels[this.$props.areaName]
    }
  },
  methods: {
    drag (event, i) {
      console.log('dargstart', i)
      this.$store.commit('drag', {
        event: event,
        component: this.$props.areaName,
        label: i
      })
    },
    allowDrag (event) {
      event.preventDefault()
    },
    drop (event) {
      this.$store.commit('drop', {
        event: event,
        component: this.$props.areaName
      })
    }
  }
}
</script>

<style lang="css" scoped>
.label-container{
  padding: 0.2rem;
}
</style>

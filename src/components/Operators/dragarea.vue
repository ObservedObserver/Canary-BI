<template lang="html">
  <div class="drag-container" @dragover="allowDrag($event)" @drop="drop($event)">
    {{title}}
    <span class="label-container"
    v-for="(label, i) in dataLabels"
    draggable="true"
    @dragstart="drag($event, i)"
    :key="label.name">
      <el-tag :type="labelColor(label)">
        {{label.name}} | {{labelType(label)}}
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
        component: this.$props.areaName,
        label: i
      })
    },
    allowDrag (event) {
      event.preventDefault()
    },
    drop (event) {
      this.$store.commit('drop', {
        ev: event,
        component: this.$props.areaName
      })
    },
    labelColor (label) {
      let typeDict = {
        string: undefined,
        number: 'success',
        time: 'warning'
      }
      return typeDict[label.type]
    },
    labelType (label) {
      let typeDict = {
        string: '维度',
        number: '度量',
        time: '时间维度'
      }
      return typeDict[label.type]
    }
  }
}
</script>

<style lang="css" scoped>
.label-container{
  padding: 0.2rem;
}
</style>

<template lang="html">
  <div @dragover="allowDrag($event)" @drop="drop($event)">
    {{title}}
      <div class="ui label" draggable="true"
       v-for="(label, i) in dataLabels"
       :key="label.name"
       :class="{
         teal: label.type === 'string',
         blue: label.type === 'number'
         }"
       @dragstart="drag($event, i)">
        {{label.name}}
        <div class="detail">
          {{label.type}}
        </div>
      </div>

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
      name: this.$props.areaName,
      dataLabels: this.$store.state.globalDataLabels[this.$props.areaName]
    }
  },
  // mounted () {
  //   if (this.name === 'data') {
  //     this.dataLabels = this.$store.state.constDataLabels
  //   }
  // },
  methods: {
    drag (event, i) {
      this.$store.commit('drag', {
        event: event,
        component: this.name,
        label: i
      })
    },
    allowDrag (event) {
      event.preventDefault()
    },
    drop (event) {
      this.$store.commit('drop', {
        event: event,
        component: this.name
      })
    }
  }
}
</script>

<style lang="css" scoped>
.ui.label{
  margin: 0.28rem;
}
</style>

<template lang="html">
  <div>
    <div class="range-container" @mousemove="rangeMove" @mouseup="rangeEnd" @mouseleave="rangeEnd" ref="container">
      <div class="range-value" :style="{left: leftPos, right: rightPos}"></div>
      <div class="ui grey circular label left" :style="{left: leftPos}"
      @mousedown="rangeStart($event, 'left')"></div>
      <div @mousedown="rangeStart($event, 'right')" class="ui grey circular label right" :style="{right: rightPos}"></div>
    </div>
  </div>

</template>

<script>
// import $ from 'jquery'
export default {
  name: 'range',
  data () {
    return {
      range: {
        left: 5,
        right: 75
      },
      status: undefined,
      startX: 5,
      startY: 75
    }
  },
  methods: {
    rangeStart (event, ele) {
      if (this.status === undefined) {
        this.status = ele
        this.startX = event.pageX
      }
    },
    rangeMove (event) {
      if (this.status !== undefined) {
        // console.log(this.$refs.container.clientWidth, $('.range-container').width())
        event.preventDefault()
        let width = this.$refs.container.clientWidth
        let delta = event.pageX - this.startX
        this.startX = event.pageX
        if (this.status === 'left') {
          this.range.left = Math.min(Math.max(this.range.left + Number((delta / width * 100).toFixed(3)), 0), this.range.right)
        } else {
          this.range.right = Math.max(Math.min(this.range.right + Number((delta / width * 100).toFixed(3)), 100), this.range.left)
        }
        // console.log(delta)
        // console.log(this.range)
      }
    },
    rangeEnd (event) {
      // this.status = false
      if (this.status !== undefined) {
        let width = this.$refs.container.clientWidth
        let delta = event.pageX - this.startX
        // console.log(delta, width)
        this.startX = event.pageX
        // this.range[this.status] += Number((delta / width * 100).toFixed(3))
        if (this.status === 'left') {
          this.range.left = Math.min(Math.max(this.range.left + Number((delta / width * 100).toFixed(3)), 0), this.range.right)
        } else {
          this.range.right = Math.max(Math.min(this.range.right + Number((delta / width * 100).toFixed(3)), 100), this.range.left)
        }
        // this.r.x += parseInt((delta / width * 100).toFixed(0))
        // this.range[0] = this.range[0].splice()
        this.status = undefined
        // console.log(delta, this.range, this.leftPos, 'in methods')
      }
    }
  },
  computed: {
    rightPos () {
      return 100 - this.range.right + '%'
    },
    leftPos () {
      console.log(this.range, 'in computed')
      // return this.range[0] + '%'
      return this.range.left + '%'
    }
  }
}
</script>

<style lang="css" scpoed>
.range-container{
  position: relative;
  left: 2rem;
  top: 2rem;
  width: 60rem;
  height: 1.2rem;
  padding: 0.15rem;
  border-radius: 0.6rem;
  border: 1px solid rgb(172, 172, 172)
}
.range-container > .ui.circular.label.left{
  position: absolute;
  left: 0%;
  top: 0.6rem;;
  transform: translate(-100%, -50%);
}
.range-container > .ui.circular.label.right{
  position: absolute;
  right: 0%;
  top: 0.6rem;;
  transform: translate(100%, -50%);
}
.range-value{
  height: 0.8rem;
  /*height: 1rem;*/
  background-color: rgb(121, 197, 199);
  position: absolute;
  left: 0rem;
  right: 0rem;
}

</style>

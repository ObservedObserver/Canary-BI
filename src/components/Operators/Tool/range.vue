<template lang="html">
  <div class="ui basic segment">
    <div class="range-container" @mousemove="rangeMove" @mouseup="rangeEnd" @mouseleave="rangeEnd" ref="container">
      <div class="range-value" :style="{left: leftPos, right: rightPos}"></div>
      <div ref="leftLabel" class="ui grey circular label left" :style="{left: leftPos}"
      @mousedown="rangeStart($event, 'left')">{{leftValue}}</div>
      <div ref="rightLabel" @mousedown="rangeStart($event, 'right')"
      class="ui grey circular label right"
      :style="{right: rightPos}">{{rightValue}}</div>
    </div>
    {{extremum.min}} | {{extremum.max}}
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'range',
  props: {
    fid: {
      type: Number
    },
    extremum: {
      type: Object,
      default: () => {
        return {
          min: 0,
          max: 0
        }
      }
    }
  },
  data () {
    return {
      range: {
        left: 0,
        right: 100
      },
      max: 0,
      min: 0,
      status: undefined,
      startX: 0,
      WIDTH: 0,
      LEFT: 0
    }
  },
  // beforeMounted () {
  //   [this.min, this.max] = this.$store.state.filterStatistics[this.$props.fid].value
  //   console.log('max and min', [this.min, this.max])
  // },
  methods: {
    rangeStart (event, ele) {
      if (this.status === undefined) {
        this.LEFT = $('.range-container').offset().left
        this.WIDTH = this.$refs.container.clientWidth
        this.status = ele
        // this.startX = event.pageX
      }
    },
    rangeMove (event) {
      if (this.status !== undefined) {
        // console.log(event.offsetX, this.$refs.container.clientWidth)
        event.preventDefault()
        // let width = this.$refs.container.clientWidth
        // let delta = event.pageX - this.startX
        // this.startX = event.pageX
        if (this.status === 'left') {
          this.range.left = Number(((event.pageX - this.LEFT) / this.WIDTH * 100).toFixed(3))
          // this.range.left = Math.min(Math.max(this.range.left + Number((delta / width * 100).toFixed(3)), 0), this.range.right)
        } else {
          this.range.right = Number(((event.pageX - this.LEFT) / this.WIDTH * 100).toFixed(3))
          // this.range.right = Math.max(Math.min(this.range.right + Number((delta / width * 100).toFixed(3)), 100), this.range.left)
        }
      }
    },
    rangeEnd (event) {
      if (this.status !== undefined) {
        // let width = this.$refs.container.clientWidth
        // let delta = event.pageX - this.startX
        // this.startX = event.pageX
        if (this.status === 'left') {
          this.range.left = Number(((event.pageX - this.LEFT) / this.WIDTH * 100).toFixed(3))
          // this.range.left = Math.min(Math.max(this.range.left + Number((delta / width * 100).toFixed(3)), 0), this.range.right)
        } else {
          // this.range.right = Math.max(Math.min(this.range.right + Number((delta / width * 100).toFixed(3)), 100), this.range.left)
          this.range.right = Number(((event.pageX - this.LEFT) / this.WIDTH * 100).toFixed(3))
        }
        this.status = undefined
      }
    }
  },
  computed: {
    rightPos () {
      return 100 - this.range.right + '%'
    },
    rightValue () {
      let ans = (this.$props.extremum.max - this.$props.extremum.min) * this.range.right / 100 + this.$props.extremum.min
      // console.log('leftValue', [this.$props.fid, 1, ans])
      this.$store.commit('changeFilterRange', [this.$props.fid, 'max', ans])
      return Number(ans.toFixed(1))
    },
    leftPos () {
      // console.log(this.range, 'in computed')
      // return this.range[0] + '%'
      return this.range.left + '%'
    },
    leftValue () {
      let ans = (this.$props.extremum.max - this.$props.extremum.min) * this.range.left / 100 + this.$props.extremum.min
      this.$store.commit('changeFilterRange', [this.$props.fid, 'min', ans])
      return Number(ans.toFixed(1))
      // 问题在于未确定数值的范围便约定保留位数
    }
  }
}
</script>

<style lang="css" scoped>
.range-container{
  position: relative;
  width: 100%;
  /*width: 60rem;*/
  height: 1.2rem;
  padding: 0.15rem;
  border-radius: 0.6rem;
  border: 1px solid rgb(172, 172, 172)
}
.range-container > .ui.circular.label.left{
  position: absolute;
  left: 0%;
  top: 0.6rem;;
  transform: translate(0%, -50%);
}
.range-container > .ui.circular.label.right{
  position: absolute;
  right: 0%;
  top: 0.6rem;;
  transform: translate(0%, -50%);
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

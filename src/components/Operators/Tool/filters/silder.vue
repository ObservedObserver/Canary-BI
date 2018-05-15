<template lang="html">
  <div class="silder-block">
    <el-slider
      v-model="val"
      range
      :min="range[0]"
      :max="range[1]">
    </el-slider>
    <el-button @click="submitChange"
    type="success" icon="el-icon-check" circle></el-button>
    <span> 提交修改 </span>
    <el-button @click="cancelChange"
    type="warning" icon="el-icon-delete" circle></el-button>
    <span> 取消 </span>
  </div>
</template>

<script>
export default {
  name: 'filter-silder',
  props: {
    range: {
      type: Array,
      default () {
        return [0, 100]
      }
    },
    value: {
      type: Array,
      default () {
        return [0, 100]
      }
    },
    index: {
      type: Number
    }
  },
  // 实验
  data () {
    return {
      val: [...this.$props.value]
    }
  },
  mounted () {
    this.$emit('filterChange', {value: this.val, index: this.$props.index})
  },
  methods: {
    submitChange () {
      this.$emit('filterChange', {value: this.val, index: this.$props.index})
    },
    cancelChange () {
      this.val = [...this.$props.value]
    }
  }
}
</script>

<style lang="css">
.silder-block{
  padding: 1rem;
}
</style>

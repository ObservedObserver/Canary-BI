<template lang="html">
  <div>
    <el-form>
      <el-form-item label="聚合方式">
        <el-radio v-for="item in func" :key="item.id" v-model="picked" :label="item" size="medium">{{item}}</el-radio>
      </el-form-item>
    </el-form>
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

<style lang="css" scoped>
.box-card{
  margin: 0.6rem;
}
</style>

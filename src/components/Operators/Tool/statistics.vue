<template lang="html">
  <el-card class="box-card">
    <el-collapse>
      <el-collapse-item title="聚合方式">
        <el-form>
          <div v-for="item in func" :key="item.id" style="margin-top:0.4rem">
            <el-radio v-model="picked" :label="item" border size="medium">{{item}}</el-radio>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-card>
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

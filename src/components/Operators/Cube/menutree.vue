<template lang="html">
  <el-tree ref="node" :data="tree"
  @check-change="handleCheckChange"
  show-checkbox></el-tree>
</template>

<script>
const PAGE_ROWS = 100
export default {
  name: 'menu-tree',
  props: {
    page: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    handleCheckChange (data) {
      // console.log(data)
      // console.log(this.$refs.node.getCheckedNodes())
      this.$emit('get-nodes', this.$refs.node.getCheckedNodes())
    }
  },
  computed: {
    tree () {
      return this.$store.getters.labelTree.children.slice(this.$props.page * PAGE_ROWS, (this.$props.page + 1) * PAGE_ROWS)
    }
  }
}
</script>

<style lang="css">
</style>

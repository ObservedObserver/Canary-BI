<template lang="html">
  <el-tree ref="node" :data="tree"
  @check-change="handleCheckChange"
  node-key="label"
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
    },
    chooseAllNodes () {
      let nodes = this.tree
      this.$nextTick(() => {
        this.$refs.node.setCheckedNodes(nodes)
      })
    },
    clearAllNodes () {
      this.$refs.node.setCheckedNodes([])
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

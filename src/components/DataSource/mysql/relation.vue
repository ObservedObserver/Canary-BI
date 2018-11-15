<template>
  
</template>
<script>
import deepcopy from 'deepcopy'
const OPTION = {
  tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
  },
  series:[
    {
      type: 'tree',
      data: [],
      top: '1%',
      left: '15%',
      bottom: '1%',
      right: '7%',
      symbolSize: 7,
      orient: 'RL',
      label: {
        position: 'right',
        verticalAlign: 'middle',
        align: 'left'
      },
      leaves: {
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        }
      },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750
    }
  ]
};
function insertItem (tree, list) {
  let node = tree
  // 如果是叶子节点，插入新节点
  // 否则，继续查找
  if (typeof node.children === 'undefined') {
    node.children = []
    list.forEach((edge) => {
      if (node.name === item.left) {
        node.children.push({
          name: child.left,
          value: 0
        })
      } else if (child.name === item.left) {
        node.children.push({
          name: child.right,
          value: 0
        })
      }
    })
  }
}
function buildTree (list) {
  let tree = {}
  let node = tree

}
export default {
  name: 'relation-chart',
  props: {
    relationList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      option: deepcopy(OPTION)
    }
  },
  computed: {
    treeData () {
      let list = this.$props.relationList
      let tree = {}
      let node = tree
      for (let i = 0, len = list.length; i < len; i++) {
        node.name = relation        
      }
      return this.$props.relationList
    }
  }
}
</script>
<style>

</style>


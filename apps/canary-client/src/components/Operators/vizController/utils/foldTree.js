function tree2Matrix ({tree, dimensions}) {
  let arr = []
  function dfs (node, item, level) {
    if (node.children.size === 0) {
      arr.push({
        ...item,
        ...node._aggData
      })
    } else {
      let children = node.children.keys()
      for (let child of children) {
        dfs(node.children.get(child), {
          ...item,
          [dimensions[level]]: child
        }, level + 1)
      }
    }
  }
  dfs(tree, {}, 0)
  return arr
}
export {tree2Matrix}

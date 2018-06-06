var transTree = function (btree) {
  let ltree = {
    label: 'root',
    children: []
  }
  let lqueue = []
  let bqueue = []
  lqueue.push(ltree)
  bqueue.push(['root', btree])
  while (lqueue.length !== 0) {
    let bnode = bqueue.shift()
    let lnode = lqueue.shift()
    lnode.label = bnode[0]
    lnode.children = []
    let bchildren = bnode[1].entries()
    for (bchild in bchildren) {
      let lchild = {}
      lqueue.push(lchild)
      bqueue.push(bchild)
      lnode.children.push(lchild)
    }
  }
  return ltree
}

function buildTree ({edgeList}) {
  let result = initMap({edgeList: edgeList.map(edge => {
    return {
      left: edge.left.table,
      right: edge.right.table
    }
  })})
  let tree = bfs(result)
  return tree
}
function initMap ({edgeList}) {
  let set = new Set()
  edgeList.forEach(edge => {
    set.add(edge.left)
    set.add(edge.right)
  })
  let hashList = [...set]
  let hash = {}
  hashList.forEach((item, index) => {
    hash[item] = index
  })
  let adjMatrix = []
  for (let i = 0; i < hashList.length; i++) {
    adjMatrix.push([])
    for (let j = 0; j < hashList.length; j++) {
      adjMatrix[i].push(0)
    }
  }
  if (hashList.length === 0) { adjMatrix.push([]) }
  edgeList.forEach(edge => {
    adjMatrix[hash[edge.left]][hash[edge.right]] = 1
    adjMatrix[hash[edge.right]][hash[edge.left]] = 1
  })
  return {adjMatrix, hashList}
}
function bfs ({adjMatrix, hashList}) {
  let nodeVisted = hashList.map(item => false)
  let queue = []
  let treeQueue = []
  let tree = {}
  tree.name = hashList[0]
  queue.push(0)
  nodeVisted[0] = true
  treeQueue.push(tree)
  while (queue.length > 0) {
    let vertex = queue.pop()
    let node = treeQueue.pop()
    node.children = []
    for (let i = 0; i < adjMatrix[vertex].length; i++) {
      if (!nodeVisted[i] && adjMatrix[vertex][i]) {
        nodeVisted[i] = true
        queue.push(i)
        let child = {name: hashList[i]}
        node.children.push(child)
        treeQueue.push(child)
      }
    }
  }
  console.log(tree)
  return tree
}

export default buildTree
// bfs({
//   adjMatrix: [
//     [0, 1, 1, 0, 0],
//     [1, 0, 0, 1, 1],
//     [1, 0, 0, 0, 0],
//     [0, 1, 0, 0, 0],
//     [0, 1, 0, 0, 0]
//   ],
//   hashList: ['Alice', 'Bob', 'Carl', 'Duke', 'Edge']
// })
// let result = initMap({edgeList: [
//   {left: 'Alice', right: 'Bob'},
//   {left: 'Bob', right: 'Duke'},
//   {left: 'Edge', right: 'Bob'},
//   {left: 'Carl', right: 'Alice'}
// ]})
// bfs(result)

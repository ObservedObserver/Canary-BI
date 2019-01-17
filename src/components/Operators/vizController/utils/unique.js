function uniqueCount (value = []) {
  let set = new Set()
  value.forEach(v => {
    set.add(v)
  })
  return set.size
}

export {uniqueCount}

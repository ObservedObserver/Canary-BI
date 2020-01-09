function valueSet ({dataSource = [], column}) {
  if (typeof column !== 'undefined') {
    let set = new Set()
    dataSource.forEach(item => {
      set.add(item[column])
    })
    return [...set]
  } else {
    return []
  }
}

export default valueSet

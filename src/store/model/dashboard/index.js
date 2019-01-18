import Segment from './segment'

class DashBoard {
  constructor (props = {}) {
    const {
      id = -1,
      title = 'new dashboard',
      segmentList = [],
      filters = [],
      interval = null
    } = props
    this.id = id
    this.title = title
    this.segmentList = segmentList
    this.filters = filters
    this.interval = interval
  }
  append (seg) {
    if (seg instanceof Segment) {
      this.segmentList.push(seg)
    } else {
      console.log('segment is not the right type')
    }
  }
  pop () {
    this.segmentList.pop()
  }
}
export default DashBoard

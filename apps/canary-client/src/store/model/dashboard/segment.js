import Chart from '../chart'
import Container from './container'

class Segment {
  constructor (props = {}) {
    const {
      chart = new Chart(),
      container = new Container(),
      setFilter = false
    } = props
    this.chart = chart
    this.container = container
    this.setFilter = setFilter
  }
}

export default Segment

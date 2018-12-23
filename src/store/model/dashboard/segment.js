import Chart from '../chart'
import Container from './container'
import DataSource from '../dataSource'

class Segment {
  constructor (props = {}) {
    const {
      chart = new Chart(),
      dataSource = new DataSource(),
      container = new Container()
    } = props
    this.chart = chart
    this.dataSource = dataSource
    this.container = container
  }
}

export default Segment

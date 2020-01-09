import DashBoard from './dashBoard.js'
import assert from 'assert'
describe('dashBoard', function () {
  it('init', function () {
    let board = new DashBoard()
    assert.equal(typeof board.title, 'string')
    assert.equal(typeof board.content, 'string')
    assert.equal(board.charts instanceof Array, true)
  })
  it('[method]addChart', function () {
    let board = new DashBoard()
    const chartProps = {
      type: 'simple-interval',
      columns: [],
      rows: [],
      color: [],
      opacity: [],
      size: [],
      shape: [],
      position: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    }
    board.addChart(chartProps)
  })
})
let index = 0
class Container {
  constructor (props = {}) {
    const {
      w = 6,
      h = 1,
      x = 0,
      y = 0,
      i = index++
    } = props
    this.w = w
    this.h = h
    this.x = x
    this.y = y
    this.i = i
  }
  updateValue (props = {}) {
    const {w, h, x, y} = props
    this.w = w
    this.h = h
    this.x = x
    this.y = y
  }
}
export default Container

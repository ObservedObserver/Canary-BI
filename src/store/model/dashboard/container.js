let i = 0
class Container {
  constructor (props = {}) {
    const {
      width = 6,
      height = 1,
      x = 0,
      y = 0
    } = props
    this.w = width
    this.h = height
    this.x = x
    this.y = y
    this.i = i++
  }
}
export default Container

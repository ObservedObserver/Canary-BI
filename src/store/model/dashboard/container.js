class Container {
  constructor (props = {}) {
    const {
      width = 600,
      height = 400,
      x = 0,
      y = 0
    } = props
    this.width = width
    this.height = height
    this.x = x
    this.y = y
  }
}
export default Container

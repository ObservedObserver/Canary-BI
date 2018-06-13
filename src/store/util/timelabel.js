var timeLabel = ({rawData, timeDimension}) => {
  return rawData.map((item) => {
    let [year, month] = item[timeDimension].split('-')
    item['year'] = year
    item['month'] = month
    return item
  })
}
export default timeLabel

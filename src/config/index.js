export default {
  fieldTypes: {
    DIMENSION: 'string',
    MEASURE: 'number'
  },
  previewMode: {
    GLOBAL: 'global',
    LOCAL: 'local'
  },
  server: {
    sql: 'http://bi.canary.plus:7001/api/sql'
  },
  aggFunc: [
    { value: 'count', label: '计数' },
    { value: 'max', label: '最大值' },
    { value: 'min', label: '最小值' },
    { value: 'mean', label: '平均值' },
    { value: 'median', label: '中位数' },
    { value: 'mode', label: '最多出现' },
    { value: 'product', label: '累积' },
    { value: 'standardDeviation', label: '标准差' },
    { value: 'sum', label: '精准和(浮点)' },
    { value: 'sumSimple', label: '和' },
    { value: 'variance', label: '方差' }
  ]
}

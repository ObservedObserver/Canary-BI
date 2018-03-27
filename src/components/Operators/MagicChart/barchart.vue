<template lang="html">
  <chart :options="option"/>
</template>

<script>
export default {
  name: 'magicBar',
  data () {
    return {
      initOption: {
        toolbox: {
          feature: {
            magicType: {
              type: ['bar', 'line', 'pie']
            }
          }
        },
        legend: {
          type: 'plain'
        },
        dataset: {
          dimensions: [],
          source: []
        },
        xAxis: {},
        yAxis: {},
        series: []
      }
    }
  },
  computed: {
    columnIndex () {
      var dims = []
      dims = this.$store.state.globalDataLabels.X.filter(val => val.type === 'string')
      if (dims.length > 0) {
        return {
          categoryDim: 'x',
          column: dims[0]
        }
      }
      dims = this.$store.state.globalDataLabels.Y.filter(val => val.type === 'string')
      if (dims.length > 0) {
        return {
          categoryDim: 'y',
          column: dims[0]
        }
      }
      return false
    },
    xLabels () {
      return this.$store.state.globalDataLabels.X.map((val) => {
        return val.name
      })
    },
    yLabels () {
      return this.$store.state.globalDataLabels.Y.map((val) => {
        return val.name
      })
    },
    option () {
      var op = this.initOption
      op.dataset.source = this.$store.getters.jsonDataSet
      op.dataset.dimensions = this.$store.getters.jsonDataSetDimension
      op.series = []
      for (let i = 0; i < op.dataset.dimensions.length - 1; i++) {
        op.series.push({type: 'bar'})
      }
      if (this.columnIndex !== false) {
        // op[`${this.columnIndex.categoryDim}Axis`] = {
        //   type: 'category',
        // }
        if (this.columnIndex.categoryDim === 'x') {
          op.xAxis = {type: 'category'}
          op.yAxis = {}
        } else {
          op.xAxis = {}
          op.yAxis = {type: 'category'}
        }
        op.series.forEach((val, index, arr) => {
          val.encode = {
            x: this.xLabels[index % this.xLabels.length],
            y: this.yLabels[index % this.yLabels.length]
          }
          // console.log(index, this.xLabels.lenth)
        })
      }
      console.log(op)
      return op
    }
  }
}
</script>

<style lang="css">
</style>

<template lang="html">
  <div>
    <div class="ui slider checkbox">
      <input type="checkbox" name="stack" v-model="stackMode">
      <label>Stack</label>
    </div>
    <chart v-for="op in testOption" :key="op.id" :options="op" />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'magic-bar',
  data () {
    return {
      stackMode: false,
      initOption: {
        title: {},
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
          // dimensions: [],
          source: []
        },
        xAxis: {type: 'category'},
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
    testOption () {
      let bidataset = this.$store.getters.biDataset
      let dimensions = bidataset.dimensions
      let measures = bidataset.measures
      let stat = bidataset.stat
      let mixDim = bidataset.mixDim
      let lowerMixDim = bidataset.lowerMixDim
      let ops = []
      if (dimensions.length > 1) {
        console.log('dimensions.length > 1')
        console.log(bidataset)
        for (let i = 0; i < (lowerMixDim.length - 1); i++) {
          // let ds = bidataset.dataset.slice(i, i + (lowerMixDim.length - 1))
          let ds = []
          // let i = 1; i < bidataset.dataset.length; i+=(lowerMixDim.length - 1)
          for (let j = 1; j < bidataset.dataset.length; j+=(lowerMixDim.length - 1)) {
            ds.push(bidataset.dataset[i + j])
          }
          ds.unshift(bidataset.dataset[0])
          let op = deepcopy(this.initOption)
          op.dataset.source = ds
          op.title.text = ''
          op.title.text = (ds[1].slice(1, dimensions.length)).toString()
          for (let j = 0; j < measures.length || 0; j++) {
            op.series.push({
              type: 'bar',
              name: measures[j],
              stack: this.stackMode ? dimensions[0] : undefined,
              encode: {
                y: measures[j],
                x: [dimensions[0]]
              }
            })
          }
          // op.dataset.dimensions = [dimensions[i], ...measures]
          ops.push(op)
        }
      } else if (dimensions.length === 1) {
        let op = deepcopy(this.initOption)
        op.dataset.source = bidataset.dataset
        for (let j = 0; j < measures.length || 0; j++) {
          op.series.push({
            type: 'bar',
            name: measures[j],
            stack: this.stackMode ? dimensions[0] : undefined,
            encode: {
              y: measures[j],
              x: [dimensions[0]]
            }
          })
        }
        ops.push(op)
      }

      // op.xAxis = {type: 'category'}
      return ops
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
    },
    datasets () {
      return this.$store.getters.jsonTransData
    },
    tmpOption () {
      var op
      var datasets = this.datasets
      var ans = []
      var tables = Object.keys(datasets)
      for (let i = 0; i < tables.length; i++) {
        op = deepcopy(this.initOption)
        op.title.text = tables[i]
        op.dataset.source = datasets[tables[i]]
        for (let j = 0; j < op.dataset.source[0].length - 1 || 0; j++) {
          op.series.push({type: 'bar'})
        }
        ans.push(op)
      }
      console.log(ans)
      return ans
    }
  }
}
</script>

<style lang="css">
</style>

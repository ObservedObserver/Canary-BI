<template lang="html">
  <div>
    <chart v-for="op in option" :key="op.id" :options="op" />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'magic-scatter',
  data () {
    return {
      initOption: {
        title: {},
        legend: {
          type: 'plain'
        },
        dataset: {
          // dimensions: [],
          source: []
        },
        xAxis: {},
        yAxis: {},
        series: []
      }
    }
  },
  computed: {
    option () {
      let bidataset = this.$store.getters.biDataset
      let dimensions = bidataset.dimensions
      let measures = bidataset.measures
      let stat = bidataset.stat
      let mixDim = bidataset.mixDim
      let lowerMixDim = bidataset.lowerMixDim
      let ops = []
      if (measures.length < 2) {
        return []
      }
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
          for (let j = 0; j < measures.length - 1 || 0; j++) {
            op.series.push({
              type: 'scatter',
              encode: {
                y: measures[j],
                x: measures[j + 1]
              }
            })
          }
          // op.dataset.dimensions = [dimensions[i], ...measures]
          ops.push(op)
        }
      } else if (dimensions.length === 1) {
        let op = deepcopy(this.initOption)
        op.dataset.source = bidataset.dataset
        for (let j = 0; j < measures.length - 1 || 0; j++) {
          op.series.push({
            type: 'scatter',
            encode: {
              y: measures[j],
              x: measures[j + 1]
            }
          })
        }
        ops.push(op)
      }
      console.log(ops)
      // op.xAxis = {type: 'category'}
      return ops
    }
  }
}
</script>

<style lang="css">
</style>

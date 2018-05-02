<template lang="html">
  <div>
    <chart v-for="op in option" :key="op.id" :options="op" />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'magic-pie',
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
          let rad = parseInt(100 / measures.length)
          for (let j = 0; j < measures.length || 0; j++) {
            op.series.push({
              type: 'pie',
              radius: [0, `${rad * 0.9}%`],
              center: [`${rad * (j + 0.5)}%`, '50%'],
              encode: {
                value: measures[j],
                itemName: [dimensions[0]]
              }
            })
          }
          // op.dataset.dimensions = [dimensions[i], ...measures]
          ops.push(op)
        }
      } else if (dimensions.length === 1) {
        let op = deepcopy(this.initOption)
        op.dataset.source = bidataset.dataset
        let rad = parseInt(100 / measures.length)
        for (let j = 0; j < measures.length || 0; j++) {
          op.series.push({
            type: 'pie',
            radius: [0, `${rad * 0.9}%`],
            center: [`${rad * (j + 0.5)}%`, '50%'],
            encode: {
              value: measures[j],
              itemName: [dimensions[0]]
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

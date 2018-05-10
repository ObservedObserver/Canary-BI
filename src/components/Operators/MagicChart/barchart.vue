<template lang="html">
  <div style="width:100%">
    <el-checkbox v-model="stackMode" label="1" border size="medium">Stack</el-checkbox>
    <chart v-for="op in option" :key="op.id" :options="op" />
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
        legend: {
          type: 'scroll'
        },
        tooltip: {},
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
    biOption () {
      let bidataset = this.$store.getters.biDataset
      let dimensions = bidataset.dimensions
      let measures = bidataset.measures
      let lowerMixDim = bidataset.lowerMixDim
      let ops = []
      if (dimensions.length > 1) {
        console.log('dimensions.length > 1')
        console.log(bidataset)
        for (let i = 0; i < (lowerMixDim.length - 1); i++) {
          // let ds = bidataset.dataset.slice(i, i + (lowerMixDim.length - 1))
          let ds = []
          // let i = 1; i < bidataset.dataset.length; i+=(lowerMixDim.length - 1)
          for (let j = 1; j < bidataset.dataset.length; j += (lowerMixDim.length - 1)) {
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
    rawOption () {
      let {dimensions} = this.$store.getters.originLabels
      let {measures} = this.$store.getters.biLabels
      let dataset = this.$store.getters.originDataset
      if (dimensions.length === 0) {
        return []
      }
      let ops = []
      for (let j = 0; j < measures.length; j++) {
        let op = deepcopy(this.initOption)
        op.dataset.source = dataset.map((row) => {
          return [row.slice(0, dimensions.length).toString()].concat(row.slice(dimensions.length))
        })
        op.series.push({
          type: 'bar',
          name: measures[j],
          encode: {
            y: measures[j],
            x: dataset[0].slice(0, dimensions.length).toString()
          }
        })
        ops.push(op)
      }
      return ops
    },
    option () {
      return this.$store.state.dataAggregation ? this.biOption : this.rawOption
    }
  }
}
</script>

<style lang="css">
</style>

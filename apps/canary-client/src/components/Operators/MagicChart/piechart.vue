<template lang="html">
  <div>
    <el-checkbox v-model="roseMode" label="1" border size="medium">Rose</el-checkbox>
    <chart v-for="op in option" :key="op.id" :options="op" />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'magic-pie',
  data () {
    return {
      roseMode: false,
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
        series: []
      }
    }
  },
  computed: {
    option () {
      return this.$store.state.dataAggregation ? this.biOption : this.rawOption
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
          type: 'pie',
          name: measures[j],
          roseType: this.roseMode ? 'radius' : undefined,
          encode: {
            value: measures[j],
            itemName: dataset[0].slice(0, dimensions.length).toString()
          }
        })
        ops.push(op)
      }
      return ops
    },
    biOption () {
      let dataset = this.$store.getters.biDataset
      let {dimensions, measures} = this.$store.getters.biLabels
      let {lowerMixDim} = this.$store.getters.biDimension
      let ops = []
      if (dimensions.length > 1) {
        for (let i = 0; i < (lowerMixDim.length - 1); i++) {
          // let ds = dataset.slice(i, i + (lowerMixDim.length - 1))
          let ds = []
          // let i = 1; i < bidataset.dataset.length; i+=(lowerMixDim.length - 1)
          for (let j = 1; j < dataset.length; j += (lowerMixDim.length - 1)) {
            ds.push(dataset[i + j])
          }
          ds.unshift(dataset[0])
          let op = deepcopy(this.initOption)
          op.dataset.source = ds
          op.title.text = ''
          op.title.text = (ds[1].slice(1, dimensions.length)).toString()
          let rad = parseInt(100 / measures.length)
          for (let j = 0; j < measures.length || 0; j++) {
            op.series.push({
              type: 'pie',
              radius: [this.roseMode ? `${rad * 0.1}%` : 0, `${rad * 0.9}%`],
              center: [`${rad * (j + 0.5)}%`, '50%'],
              roseType: this.roseMode ? 'radius' : undefined,
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
        op.dataset.source = dataset
        let rad = parseInt(100 / measures.length)
        for (let j = 0; j < measures.length || 0; j++) {
          op.series.push({
            type: 'pie',
            radius: [this.roseMode ? `${rad * 0.1}%` : 0, `${rad * 0.9}%`],
            center: [`${rad * (j + 0.5)}%`, '50%'],
            roseType: this.roseMode ? 'radius' : undefined,
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

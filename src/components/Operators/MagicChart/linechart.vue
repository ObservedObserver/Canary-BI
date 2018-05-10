<template lang="html">
  <div>
    <div class="ui slider checkbox">
      <input type="checkbox" name="stack" v-model="stackMode">
      <label>Stack</label>
    </div>
    <div class="ui slider checkbox">
      <input type="checkbox" name="area" v-model="areaMode">
      <label>Area</label>
    </div>
    <chart v-for="op in option" :key="op.id" :options="op" />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'magic-line',
  data () {
    return {
      stackMode: false,
      areaMode: false,
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
          type: 'line',
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
    biOption () {
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
              type: 'line',
              name: measures[j],
              areaStyle: this.areaMode ? {} : undefined,
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
            type: 'line',
            name: measures[j],
            areaStyle: this.areaMode ? {} : undefined,
            stack: this.stackMode ? dimensions[0] : undefined,
            encode: {
              y: measures[j],
              x: [dimensions[0]]
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

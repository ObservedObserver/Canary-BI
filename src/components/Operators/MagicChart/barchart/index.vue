<template lang="html">
  <div>
    <bar-chart :node="option"/>
  </div>
</template>

<script>
import barChart from './barchart.vue'
import deepcopy from 'deepcopy'
var dfs = ({options, dimensions, measures, pos, valueSet, values, self, node, dataset}) => {
  if (pos === dimensions.length - 1) {
    let size = valueSet[dimensions[pos]].size
    node.option = getOption({
      dimensions,
      measures,
      start: self.start,
      end: self.start + size,
      // dataset: self.$store.getters.biDataset,
      initOption: self.initOption,
      dataset
    })
    self.start += size
  } else {
    let vs = [...valueSet[dimensions[pos]]]
    let curLen = vs.length
    for (let i = 0; i < curLen; i++) {
      node.next.push({
        text: vs[i],
        next: []
      })
      dfs({
        dimensions,
        measures,
        pos: pos + 1,
        values: values.concat(vs[i]),
        valueSet,
        options,
        dataset,
        self,
        node: node.next[i]
      })
    }
  }
}
var getOption = ({dimensions, measures, start, end, initOption, dataset}) => {
  // let dataset = self.$store.getters.biDataset
  let ds = dataset.slice(start, end)
  console.log('ds', ds, start, end)
  ds.unshift(dataset[0])
  let op = deepcopy(initOption)
  op.dataset.source = ds
  op.title.text = ''
  op.title.text = (ds[0].slice(0, dimensions.length - 1)).toString() + '=' + (ds[1].slice(0, dimensions.length - 1)).toString()
  for (let j = 0; j < measures.length || 0; j++) {
    op.series.push({
      type: 'bar',
      name: measures[j],
      stack: this.stackMode ? dimensions[0] : undefined,
      encode: {
        y: measures[j],
        x: [dimensions[dimensions.length - 1]]
      }
    })
  }
  return op
}
export default {
  name: 'bar-father',
  data () {
    return {
      start: 1,
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
      let dataset = this.$store.getters.biDataset
      let {dimensions, measures} = this.$store.getters.biLabels
      let ops = []
      let node = {
        text: 'barchart',
        next: []
      }
      this.start = 1
      dfs({
        options: ops,
        dimensions,
        measures,
        pos: 0,
        valueSet: this.$store.state.valueSet,
        dataset,
        values: [],
        self: this,
        node
      })
      return node
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
            x: dataset[0].slice(0, dimensions.length)
          }
        })
        ops.push(op)
      }
      return ops
    },
    option () {
      return this.$store.state.dataAggregation ? this.biOption : this.rawOption
    }
  },
  components: {
    barChart
  }
}
</script>

<style lang="css">
</style>

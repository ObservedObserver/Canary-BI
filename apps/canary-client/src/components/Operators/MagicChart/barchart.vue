<template lang="html">
  <div style="width:100%">
    <el-checkbox v-model="stackMode" label="1" border size="medium">Stack</el-checkbox>
    <chart v-for="op in option" :key="op.id" :options="op" />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
var dfs = ({options, dimensions, measures, pos, valueSet, values, self}) => {
  if (pos === dimensions.length - 1) {
    let size = valueSet[dimensions[pos]].size
    console.log('test', {
      dimensions,
      measures,
      start: self.start,
      end: self.start + size,
      dataset: self.$store.getters.biDataset,
      initOption: self.initOption
    })
    options.push(getOption({
      dimensions,
      measures,
      start: self.start,
      end: self.start + size,
      // dataset: self.$store.getters.biDataset,
      initOption: self.initOption,
      dataset
    }))
    self.start += size
    // let op = options[options.length - 1]
    // return (
    //   <chart :options="op" />
    // )
  } else {
    let vs = [...valueSet[dimensions[pos]]]
    let curLen = vs.length
    // let totLen = curLen * dfs(dimensions, pos + 1)
    for (let i = 0; i < curLen; i++) {
      dfs({
        dimensions,
        measures,
        pos: pos + 1,
        values: values.concat(vs[i]),
        valueSet,
        options,
        dataset,
        self
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
  name: 'magic-bar',
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
      // let {lowerMixDim} = this.$store.getters.biDimension
      let ops = []
      if (dimensions.length > 1) {
        this.start = 1
        dfs({
          options: ops,
          dimensions,
          measures,
          pos: 0,
          valueSet: this.$store.state.valueSet,
          dataset,
          values: [],
          self: this
        })
        return ops
        // for (let i = 1; i < dataset.length; i += (lowerMixDim.length - 1)) {
        //   let ds = dataset.slice(i, i + (lowerMixDim.length - 1))
        //   console.log('dataset', ds)
        //   // let ds = []
        //   // for (let j = 1; j < dataset.length; j += (lowerMixDim.length - 1)) {
        //   //   ds.push(dataset[i + j])
        //   // }
        //   ds.unshift(dataset[0])
        //   let op = deepcopy(this.initOption)
        //   op.dataset.source = ds
        //   op.title.text = ''
        //   op.title.text = (ds[0].slice(0, dimensions.length - 1)).toString() + '=' + (ds[1].slice(0, dimensions.length - 1)).toString()
        //   for (let j = 0; j < measures.length || 0; j++) {
        //     op.series.push({
        //       type: 'bar',
        //       name: measures[j],
        //       stack: this.stackMode ? dimensions[0] : undefined,
        //       encode: {
        //         y: measures[j],
        //         x: [dimensions[dimensions.length - 1]]
        //       }
        //     })
        //   }
        //   // op.dataset.dimensions = [dimensions[i], ...measures]
        //   ops.push(op)
        // }
      } else if (dimensions.length === 1) {
        let op = deepcopy(this.initOption)
        op.dataset.source = dataset
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
  }
}
</script>

<style lang="css">
</style>

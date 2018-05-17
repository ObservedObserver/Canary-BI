<template lang="html">
  <div>
    <el-checkbox v-if="type === 'bar' || type === 'line'"
    v-model="mode.stack" label="1" border size="medium">
      Stack
    </el-checkbox>
    <el-checkbox v-if="type === 'line'"
    v-model="mode.area" label="2" border size="medium">
      Area
    </el-checkbox>
    <el-checkbox v-if="type === 'pie'"
    v-model="mode.rose" label="3" border size="medium">
      Rose
    </el-checkbox>
    <el-checkbox v-if="type === 'scatter'"
    v-model="mode.space" label="4" border size="medium">
      3D
    </el-checkbox>
    <super-chart :node="option"/>
  </div>
</template>

<script>
import superChart from './superchart.vue'
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
      dataset,
      self
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
var getOption = ({dimensions, measures, start, end, initOption, dataset, self}) => {
  // let dataset = self.$store.getters.biDataset
  let ds = dataset.slice(start, end)
  console.log('ds', ds, start, end)
  ds.unshift(dataset[0])
  let op = deepcopy(initOption)
  op.dataset.source = ds
  op.title.text = ''
  op.title.text = (ds[0].slice(0, dimensions.length - 1)).toString() + '=' + (ds[1].slice(0, dimensions.length - 1)).toString()
  if (self.$props.type === 'bar') {
    for (let j = 0; j < measures.length || 0; j++) {
      op.series.push({
        type: 'bar',
        name: measures[j],
        stack: self.mode.stack ? dimensions[0] : undefined,
        encode: {
          y: measures[j],
          x: dimensions.slice(-1)
        }
      })
    }
  } else if (self.$props.type === 'line') {
    for (let j = 0; j < measures.length || 0; j++) {
      op.series.push({
        type: 'line',
        name: measures[j],
        areaStyle: self.mode.area ? {} : undefined,
        stack: self.mode.stack ? dimensions.slice(-1) : undefined,
        encode: {
          y: measures[j],
          x: dimensions.slice(-1)
        }
      })
    }
  } else if (self.$props.type === 'pie') {
    let rad = parseInt(100 / measures.length)
    op.xAxis.show = false
    op.yAxis.show = false
    for (let j = 0; j < measures.length || 0; j++) {
      op.series.push({
        type: 'pie',
        radius: [self.mode.rose ? `${rad * 0.1}%` : 0, `${rad * 0.9}%`],
        center: [`${rad * (j + 0.5)}%`, '50%'],
        roseType: self.mode.rose ? 'radius' : undefined,
        encode: {
          value: measures[j],
          itemName: dimensions.slice(-1)
        }
      })
    }
  } else if (self.$props.type === 'scatter' && measures.length >= 2) {
    if (self.mode.space && measures.length >= 3) {
      op.grid3D = {width: '100%', height: '100%'}
      // op.grid = {show: false}
      op.xAxis3D = {}
      op.yAxis3D = {}
      op.zAxis3D = {}
      op.xAxis.show = false
      op.yAxis.show = false
    }
    for (let j = self.mode.space && measures.length >= 3 ? 1 : 0; j < measures.length - 1 || 0; j++) {
      op.series.push({
        type: self.mode.space && measures.length >= 3 ? 'scatter3D' : 'scatter',
        name: self.mode.space && measures.length >= 3 ? `${measures[0]}-${measures[1]}-${measures[j + 1]}` : `${measures[0]}-${measures[j + 1]}`,
        encode: {
          x: measures[0],
          y: self.mode.space && measures.length >= 3 ? measures[1] : measures[j + 1],
          z: self.mode.space && measures.length >= 3 ? measures[j + 1] : undefined
        }
      })
    }
  }
  return op
}
export default {
  name: 'chart-root',
  props: {
    type: {
      type: String,
      default () {
        return 'bar'
      }
    }
  },
  data () {
    return {
      start: 1, // 潜在的危险，被组件间共享
      mode: {
        stack: false,
        area: false,
        rose: false,
        space: false
      },
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
      this.initStart()
      dfs({
        options: ops,
        dimensions,
        measures,
        pos: 0,
        valueSet: this.$store.getters.valueSet,
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
      // return this.$store.state.dataAggregation ? this.biOption : this.rawOption
      return this.biOption
    }
  },
  methods: {
    initStart () {
      this.start = 1
    }
  },
  mounted () {
    this.mode = {
      stack: false,
      area: false,
      rose: false,
      space: false
    }
  },
  components: {
    superChart
  }
}
</script>

<style lang="css">
</style>

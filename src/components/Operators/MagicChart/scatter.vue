<template lang="html">
  <div>
    <el-checkbox v-model="spaceMode" label="1" border size="medium">3D</el-checkbox>
    <chart v-for="op in option" :key="op.id" :options="op" />
  </div>
</template>

<script>
import deepcopy from 'deepcopy'
export default {
  name: 'magic-scatter',
  data () {
    return {
      spaceMode: false,
      initOption: {
        title: {},
        legend: {
          type: 'scroll'
        },
        tooltip: {
          formatter: '{b}:{c}'
        },
        dataset: {
          // dimensions: [],
          source: []
        },
        // grid3D: {
        //   width: '100%',
        //   height: '100%'
        // },
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        xAxis: {},
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
      let ops = []
      // let {dimensions, measures, mixDim} = this.$store.state.core
      // 这样无法监控到变量的变化
      let {measures} = this.$store.getters.biLabels
      let dataset = this.$store.getters.originDataset
      console.log('raw', measures, dataset)
      if (measures.length < 2) {
        return ops
      } else {
        console.log(measures)
        let cases = []
        for (let i = 0; i < measures.length - 1; i++) {
          for (let j = i + 1; j < measures.length; j++) {
            cases.push([measures[i], measures[j]])
          }
        }
        cases.forEach((axis) => {
          let op = deepcopy(this.initOption)
          op.dataset.source = dataset
          op.xAxis.name = axis[0]
          op.yAxis.name = axis[1]
          op.series.push({
            type: 'scatter',
            encode: {
              x: axis[0],
              y: axis[1]
            }
          })
          ops.push(op)
        })
        return ops
      }
    },
    biOption () {
      let {dimensions, measures, lowerMixDim, dataset} = this.$store.getters.biDataset
      let ops = []
      if (measures.length < 2) {
        return []
      }
      if (dimensions.length > 1) {
        for (let i = 0; i < (lowerMixDim.length - 1); i++) {
          // let ds = dataset.slice(i, i + (lowerMixDim.length - 1))
          let ds = []
          // let i = 1; i < dataset.length; i+=(lowerMixDim.length - 1)
          for (let j = 1; j < dataset.length; j += (lowerMixDim.length - 1)) {
            ds.push(dataset[i + j])
          }
          ds.unshift(dataset[0])
          let op = deepcopy(this.initOption)
          op.dataset.source = ds
          op.title.text = ''
          op.title.text = (ds[1].slice(1, dimensions.length)).toString()
          // op.grid3D = this.spaceMode && measures.length >= 3 ? {width: '100%', height: '100%'} : undefined
          if (this.spaceMode && measures.length >= 3) {
            op.grid3D = {width: '100%', height: '100%'}
            // op.grid = {show: false}
            op.xAxis.show = false
            op.yAxis.show = false
          }
          for (let j = this.spaceMode && measures.length >= 3 ? 1 : 0; j < measures.length - 1 || 0; j++) {
            op.series.push({
              type: this.spaceMode && measures.length >= 3 ? 'scatter3D' : 'scatter',
              name: this.spaceMode && measures.length >= 3 ? `${measures[0]}-${measures[1]}-${measures[j + 1]}` : `${measures[0]}-${measures[j + 1]}`,
              encode: {
                x: measures[0],
                y: this.spaceMode && measures.length >= 3 ? measures[1] : measures[j + 1],
                z: this.spaceMode && measures.length >= 3 ? measures[j + 1] : undefined
              }
            })
          }
          // op.dataset.dimensions = [dimensions[i], ...measures]
          ops.push(op)
        }
      } else if (dimensions.length === 1) {
        let op = deepcopy(this.initOption)
        op.dataset.source = dataset
        if (this.spaceMode && measures.length >= 3) {
          op.grid3D = {width: '100%', height: '100%'}
          op.xAxis.show = false
          op.yAxis.show = false
        }
        // op.grid3D = this.spaceMode && measures.length >= 3 ? {width: '100%', height: '100%'} : undefined
        for (let j = this.spaceMode && measures.length >= 3 ? 1 : 0; j < measures.length - 1 || 0; j++) {
          op.series.push({
            type: this.spaceMode && measures.length >= 3 ? 'scatter3D' : 'scatter',
            name: this.spaceMode && measures.length >= 3 ? `${measures[0]}-${measures[1]}-${measures[j + 1]}` : `${measures[0]}-${measures[j + 1]}`,
            encode: {
              x: measures[0],
              y: this.spaceMode && measures.length >= 3 ? measures[1] : measures[j + 1],
              z: this.spaceMode && measures.length >= 3 ? measures[j + 1] : undefined
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

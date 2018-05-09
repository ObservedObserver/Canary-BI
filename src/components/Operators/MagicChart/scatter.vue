<template lang="html">
  <div>
    <div class="ui slider checkbox">
      <input type="checkbox" name="space" v-model="spaceMode">
      <label>3D</label>
    </div>
    <chart v-for="op in rawOption" :key="op.id" :options="op" />
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
          type: 'plain'
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
    rawOption () {
      let result = []
      let bidataset = this.$store.getters.biDataset
      let dataset = this.$store.getters.originDataset
      let dimensions = bidataset.dimensions
      let measures = bidataset.measures
      let mixDim = bidataset.mixDim
      console.log('raw', measures, dataset)
      if (measures.length < 2) {
        return []
      } else if (measures.length === 2) {
        console.log(measures)
        let op = deepcopy(this.initOption)
        op.dataset.source = dataset
        op.series.push({
          type: 'scatter',
          encode: {
            x: measures[0],
            y: measures[1]
          }
        })
        result.push(op)
        return result
      }
      return []

    },
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
          for (let j = 1; j < bidataset.dataset.length; j += (lowerMixDim.length - 1)) {
            ds.push(bidataset.dataset[i + j])
          }
          ds.unshift(bidataset.dataset[0])
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
        op.dataset.source = bidataset.dataset
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

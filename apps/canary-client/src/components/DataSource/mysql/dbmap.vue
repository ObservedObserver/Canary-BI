<template>
  <div class="db-map-container">
    <el-card>
      <chart :options="options" style="width:100%;" />
    </el-card>
  </div>
</template>

<script>
import buildTree from './buildTree.js'
function initOption () {
  return {
    title: {
      text: '自定义表关系图'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data: [],
        top: '1%',
        left: '15%',
        bottom: '1%',
        right: '20%',
        symbolSize: 7,
        orient: 'RL',
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        },
        leaves: {
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right'
          }
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  }
}
export default {
  name: 'mysql-map',
  props: ['edgeList'],
  computed: {
    relationTree () {
      return buildTree({edgeList: this.$props.edgeList})
    },
    options () {
      let option = initOption()
      option.series[0].data = [this.relationTree]
      return option
    }
  }
}
</script>
<style>
.db-map-container{
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>

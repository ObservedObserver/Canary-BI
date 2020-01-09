<template>
  <div>
    <el-card v-for="card in cardList" :key="card.title">
      <div slot="header" class="clearfix">
        <span>{{card.title}}</span>
      </div>
      <div class="simple-card-value">
        {{card.value}}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'simple-card',
  props: {
    dataSource: {
      type: Object,
      default () {
        return []
      }
    },
    dimensions: {
      type: Array,
      default () {
        return []
      }
    },
    measures: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    cardList () {
      let tree = this.$props.dataSource
      return [...tree.children.entries()].map(item => {
        return {
          title: item[0],
          value: item[1]._aggData[this.$props.measures].toFixed(2)
        }
      })
    }
  }
}
</script>
<style scoped>
  .simple-card-value{
    font-size: 4rem;
    line-height: 10rem;
    text-align: center;
  }
</style>

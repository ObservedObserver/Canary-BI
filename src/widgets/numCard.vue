<template>
  <div>
    <el-row class="num-card-row">
      <el-col class="num-card-content" :span="colNum" v-for="item in content" :key="item.title">
        <p>{{item.title}}</p>
        <p>{{item.value}}</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'num-card',
  data () {
    return {}
  },
  props: {
    num: {
      type: Number,
      default: 3
    },
    content: {
      type: Array,
      default () {
        return [
          {title: 'title1', value: 20},
          {title: 'title2', value: 10},
          {title: 'title3', value: 30}
        ]
      }
    }
  },
  computed: {
    colNum () {
      return parseInt(24 / this.$props.num)
    }
  }
}
</script>
<style scoped>
  .num-card-content>p:first-child{
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 4px;
  }
  .num-card-content>p{
    color: rgba(0,0,0,.85);
    font-size: 30px;
    line-height: 38px;
    margin: 0;
  }
</style>

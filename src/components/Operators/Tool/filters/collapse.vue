<template lang="html">
  <el-collapse v-model="activeNames" @change="handleChange" accordion>

    <el-collapse-item v-for="(filter, index) in filters" :key="filter.column"
    :title="filter.column" :name="index">
      <div>
        <filter-silder v-if="filter.type === 'range'" :range="filter.range" :value="filter.value" :index="index" @filterChange="changeFilter" />
        <filterForm v-if="filter.type === 'equal'" :index="index" :column="filter.column" @filterChange="changeFilter" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import filterSilder from './silder.vue'
import filterForm from './form.vue'
import deepcopy from 'deepcopy'
export default {
  name: 'filter-collapse',
  props: {
    labels: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      activeNames: ['1'],
      filters: []
    }
  },
  computed: {
    copiedLabels () {
      // deepcopy 实现对引用对象的oldvalue的记忆
      return deepcopy(this.$props.labels)
    }
  },
  watch: {
    copiedLabels (newVal, oldVal) {
      let _filters = []
      let [newValue, oldValue] = [newVal, oldVal]
      // console.log(newValue, oldValue)
      console.log('oldfilters', this.filters)
      // 将未改变的filter保留原始数据 (该部可以处理被删去的label)
      oldValue.forEach((label1) => {
        if (newValue.some(label2 => label2.name === label1.name)) {
          // console.log('find', label1)
          _filters.push(this.filters.find((filter) => { return filter.column === label1.name }))
        }
      })
      // 新建新添加的label
      newValue.forEach((label2) => {
        if (oldValue.length === 0 || oldValue.every(label1 => label2.name !== label1.name)) {
          _filters.push({
            column: label2.name,
            type: label2.type === 'string' ? 'equal' : 'range',
            range: label2.type === 'string' ? [] : [0, 100],
            value: label2.type === 'string' ? [] : [0, 100]
          })
        }
      })
      this.filters = _filters
      this.$store.commit('changeFilter', this.filters)
      console.log('newfilters', this.filters)
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    changeFilter ({index, value}) {
      this.filters[index].value = value
      this.$store.commit('changeFilter', this.filters)
    }
  },
  components: {
    filterSilder,
    filterForm
  }
}
</script>

<style lang="css">
</style>

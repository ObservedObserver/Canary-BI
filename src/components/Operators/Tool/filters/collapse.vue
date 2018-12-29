<template lang="html">
  <el-collapse v-model="activeNames" @change="handleChange" accordion>

    <el-collapse-item v-for="(filter, index) in filters" :key="filter.name"
    :title="filter.name" :name="index">
      <div>
        <filter-silder v-if="filter.filterType === 'range'" :range="filter.range" :value="filter.value" :index="index" @filterChange="changeFilter" />
        <filterForm v-if="filter.filterType === 'equal'" :index="index" :column="filter.name" :values="filter.range" @filterChange="changeFilter" />
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
      activeNames: ['1']
    }
  },
  computed: {
    filters () {
      return this.$store.state.globalDataLabels.filters
    },
    copiedLabels () {
      // deepcopy 实现对引用对象的oldvalue的记忆
      return deepcopy(this.$props.labels)
    }
  },
  watch: {
    // copiedLabels (newVal, oldVal) {
    //   let _filters = []
    //   let [newValue, oldValue] = [newVal, oldVal]
    //   // console.log(newValue, oldValue)
    //   console.log('oldfilters', this.filters)
    //   // 将未改变的filter保留原始数据 (该部可以处理被删去的label)
    //   oldValue.forEach((label1) => {
    //     if (newValue.some(label2 => label2.name === label1.name)) {
    //       // console.log('find', label1)
    //       _filters.push(...(this.filters.find((filter) => { return filter.column === label1.name }) || []))
    //     }
    //   })
    //   // 新建新添加的label
    //   newValue.forEach((label2) => {
    //     if (oldValue.length === 0 || oldValue.every(label1 => label2.name !== label1.name)) {
    //       console.log('valueset', this.$store.state.valueSet)
    //       // debugger
    //       let values = [...this.$store.state.valueSet[label2.name]]
    //       _filters.push({
    //         column: label2.name,
    //         type: label2.type === 'string' ? 'equal' : 'range',
    //         range: label2.type === 'string' ? values : [Math.min(...values), Math.max(...values)],
    //         value: label2.type === 'string' ? values : [Math.min(...values), Math.max(...values)]
    //       })
    //     }
    //   })
    //   this.filters = _filters
    //   this.$store.commit('changeFilter', this.filters)
    //   console.log('newfilters', this.filters)
    // }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    changeFilter ({index, value}) {
      let filters = [...this.filters]
      filters[index].value = value
      this.$store.commit('changeFilter', filters)
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

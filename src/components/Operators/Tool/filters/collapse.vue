<template lang="html">
  <el-collapse v-model="activeNames" @change="handleChange" accordion>

    <el-collapse-item v-for="(filter, index) in filters" :key="filter.column"
    :title="filter.column" :name="index">
      <div>
        <filter-silder :range="filter.range" :value="filter.value" :index="index" @filterChange="changeFilter" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import filterSilder from './silder.vue'
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
  watch: {
    labels (oldValue, newValue) {
      this.filters = newValue.map((label) => {
        // 临时方案
        return {
          column: label.name,
          type: label.type === 'String' ? 'equal' : 'range',
          range: label.type === 'String' ? [] : [0, 100],
          value: label.type === 'String' ? [] : [0, 100]
        }
      })
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
    filterSilder
  }
}
</script>

<style lang="css">
</style>

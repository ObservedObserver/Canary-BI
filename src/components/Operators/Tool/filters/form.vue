<template lang="html">
  <el-form ref="form" :model="form">
    <el-form-item label="match values">
      <el-checkbox-group v-model="form.values">
        <el-checkbox v-for="(value, index) in form.fixedValues" :key="value.key"
        :label="value" name="type" ></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-button @click="submitChange"
    type="success" icon="el-icon-check" circle></el-button>
    <span> 提交修改 </span>
  </el-form>
</template>

<script>
export default {
  name: 'filter-form',
  props: {
    index: {
      type: Number
    },
    column: {
      type: String
    }
  },
  data () {
    return {
      form: {
        newItem: '',
        fixedValues: [],
        values: []
      }
    }
  },
  mounted () {
    // if (this.$props.column)
    let dataset = this.$store.state.globalData
    let column = this.$props.column
    let set = new Set()
    dataset.forEach((val) => {
      set.add(val[column])
    })

    this.form.values = [...set]
    // this.form.fixedValues = [...this.form.values]
    console.log(this.form)
    this.form.fixedValues = [...set]
  },
  methods: {
    createItem () {
      this.form.values.push(this.form.newItem)
      this.form.newItem = ''
    },
    submitChange () {
      this.$emit('filterChange', {index: this.$props.index, value: this.form.values})
    }
  }
}
</script>

<style lang="css">
</style>

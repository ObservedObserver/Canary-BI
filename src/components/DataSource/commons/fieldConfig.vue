<template>
  <el-card>
    <div slot="header">
      <span>字段配置</span>
      <el-button style="float: right" @click="setFieldConfig" size="small" type="primary">确认</el-button>
    </div>
    <el-form label-position="right" label-width="100px">
      <el-form-item v-for="(field, index) in tableDataField"
      :label="field.name"
      :key="field.name">
        <el-select v-model="fieldConfig[index].type" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import deepcopy from 'deepcopy'
import GLOBAL_CONFIG from '@/config/index.js'
import Field from '@/store/model/field'
export default {
  name: 'field-config',
  props: {
    mode: {
      type: String,
      default () {
        return 'global' // or 'local'
      }
    },
    dsIndex: { type: Number }
  },
  data () {
    return {
      typeOptions: [
        {value: 'string', label: '维度'},
        {value: 'number', label: '度量'},
        {value: 'time', label: '时间'}
      ],
      fieldConfig: []
    }
  },
  created () {
    this.fieldConfig = deepcopy(this.dataLabels)
  },
  watch: {
    dataLabels (val) {
      this.fieldConfig = deepcopy(this.dataLabels)
    }
  },
  computed: {
    dataLabels () {
      if (this.$props.mode === 'global') {
        return this.$store.state.globalDataLabels.data
      } else {
        let dsIndex = this.$props.dsIndex
        let db = this.$store.state.database.dataSource[dsIndex].foreignDB
        let {dimensions = [], measures = []} = db !== null ? db : {}
        let fields = [
          ...dimensions.map(item => {
            return new Field({name: item}).setDimension()
          }),
          ...measures.map(item => {
            return new Field({name: item}).setMeasure()
          })
        ]
        return fields
      }
    },
    tableDataField () {
      // 这里只是简单的引用监控，会在部分条件下无法监控到值变化
      // return this.$store.state.dataConfig.dimensions.concat(this.$store.state.dataConfig.measures)
      return this.dataLabels
    }
  },
  methods: {
    setFieldConfig () {
      if (this.$props.mode === GLOBAL_CONFIG.previewMode.GLOBAL) {
        this.$store.commit('setFieldsType', this.fieldConfig)
      } else {
        this.$store.commit('setDBFields', {
          dsIndex: this.$props.dsIndex,
          fieldsType: this.fieldConfig
        })
      }
    }
  }
}
</script>

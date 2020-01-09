<template lang="html">
  <div class="drag-container" @dragover="allowDrag($event)" @drop="drop($event)">
    {{title}}
    <span class="label-container"
    v-for="(label, i) in dataLabels"
    draggable="true"
    @dragstart="drag($event, i)"
    @dblclick="showMeasure(label, i)"
    :key="label.name">
      <el-tag :type="labelColor(label)">
        {{label.name}} | {{labelType(label)}} {{getAggFunc(label)}}
      </el-tag>
    </span>
    <el-dialog width="30%" title="度量聚合方式" :visible.sync="showMeasureConfig">
      <el-form>
        <el-form-item :label="formLabel">
          <el-select v-model="form.func">
            <el-option
              v-for="func in funcList"
              :value="func.value"
              :label="func.label"
              :key="func.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showMeasureConfig = false">取 消</el-button>
        <el-button type="primary" @click="editMeasure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Config from '@/config/index'
export default {
  name: 'dragarea',
  props: {
    areaName: {
      type: String
    },
    title: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      showMeasureConfig: false,
      form: {
        func: 'sum'
      },
      currentMeasure: 0,
      funcList: Config.aggFunc
    }
  },
  computed: {
    dataLabels () {
      return this.$store.state.globalDataLabels[this.$props.areaName]
    },
    formLabel () {
      return (this.dataLabels[this.currentMeasure] || {name: 'undefined'}).name + ' | 聚合'
    }
  },
  methods: {
    drag (event, i) {
      console.log('dargstart', i)
      this.$store.commit('drag', {
        component: this.$props.areaName,
        label: i
      })
    },
    allowDrag (event) {
      event.preventDefault()
    },
    drop (event) {
      this.$store.commit('drop', {
        ev: event,
        component: this.$props.areaName
      })
    },
    labelColor (label) {
      let typeDict = {
        string: undefined,
        number: 'success',
        time: 'warning'
      }
      return typeDict[label.type]
    },
    labelType (label) {
      let typeDict = {
        string: '维度',
        number: '度量',
        time: '时间维度'
      }
      return typeDict[label.type]
    },
    getAggFunc (label) {
      if (label.isMeasure()) {
        return ' | ' + this.funcList.find(item => {
          return item.value === label.aggFunc
        }).label
      } else {
        return ''
      }
    },
    showMeasure (label, index) {
      console.log('show measure, dblclick', label.isMeasure())
      if (label.isMeasure()) {
        this.showMeasureConfig = true
        this.currentMeasure = index
      }
    },
    editMeasure (label) {
      this.showMeasureConfig = false
      this.$store.commit('setMeasureAgg', {
        areaName: this.$props.areaName,
        labelIndex: this.currentMeasure,
        aggFunc: this.form.func
      })
    }
  }
}
</script>

<style lang="css" scoped>
.label-container{
  padding: 0.2rem;
}
</style>

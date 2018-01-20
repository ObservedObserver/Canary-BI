import Vue from 'vue'
import Vuex from 'vuex'
import globalData from './globalData.json'
Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    globalData: globalData,
    localData: [],
    filterData: [],
    globalKeys: [],
    globalDataLabels: {
      filter: [],
      page: [],
      data: [],
      X: [],
      Y: [],
      dimension: []
    },
    constDataLabels: [],
    currentLabel: {},
    dimensionLabels: [
      {name: '形状', style: ['circle', 'thin']},
      {name: '大小', style: ['square']},
      {name: '颜色', style: ['circle', 'teal']}
    ],
    filterStatistics: [],
    filterCheckedList: []
  },
  getters: {
    filterStatistics (state) {
      return state.filterStatistics
    },
    filterCheckedList (state) {
      return state.filterCheckedList
    },
    transData (state) {
      // paras === 'value'
      var _keys, _length, i, j, ans
      ans = {}
      _keys = Object.keys(state.globalData[0])
      _length = state.globalData.length
      for (i = 0; i < _keys.length; i++) {
        ans[_keys[i]] = []
      }
      for (i = 0; i < _length; i++) {
        for (j = 0; j < _keys.length; j++) {
          ans[_keys[j]].push(state.globalData[i][_keys[j]])
        }
      }
      return ans
    },
    transFilterData (state, getters) {
      // 将globalData的转换形式-transData进行筛选，选出符合需要的值
      var _trans = getters.transData
      // console.log('!!!!!!!!--trans', state.filterCheckedList)
      let i, _length, ans, keys
      // clone 一个与_trans具有相似结构的对象ans，用于存储对_trans过滤之后的数据
      ans = {}
      keys = Object.keys(_trans)
      keys.forEach((key) => { ans[key] = [] })

      // 过滤算法：
      // 枚举row的数据，对于每一条row，
      // 检查其对应的column的值是否满足filter的要求(对部分维度的操作)，
      // (若为当前维度的filter为string类型，则要枚举当前维度filter中的所有允许值[这些值被保留在一个数组中])
      // 若全部满足要求则保留当前row到ans中（对全部维度的操作）
      _length = state.globalData.length
      // 这里借助globalData.length === _trans[any_key].length的性质
      for (i = 0; i < _length; i++) {
        for (let checkedItem of state.filterCheckedList) {
          // checkedItem = {
          //   dimension: 'name',
          //   type: 'string',
          //   value: ['Alice','Bob']
          // }
          // 满足filter条件即为能在checkedItem.value中找到当前row的值（若为string）
          // 或者当前row的值在checkedItem.value的区间内（若为number）
          if (checkedItem.value.indexOf(_trans[checkedItem.dimension][i]) >= 0) {
            for (let key of keys) {
              ans[key].push(_trans[key][i])
            }
          }
        }
      }
      return ans
    }
  },
  mutations: {
    drag (state, paras) {
      // console.log(paras, state)
      state.currentLabel = state.globalDataLabels[paras.component][paras.label]
      if (paras.component !== 'data') {
        state.globalDataLabels[paras.component].splice(paras.label, 1)
      }
    },
    drop (state, paras) {
      paras.event.preventDefault()
      state.globalDataLabels[paras.component].push({
        name: state.currentLabel.name,
        type: state.currentLabel.type
      })
      // deepcopy
      state.currentLabel = {}
    },
    globalDataInit (state) {
      if (state.globalData.length !== 0) {
        // console.log(state.globalData)
        // let _keys = state.globalData[0].keys()
        let _keys = Object.keys(state.globalData[0])
        for (let i = 0; i < _keys.length; i++) {
          let item = {
            name: _keys[i],
            type: typeof state.globalData[0][_keys[i]]
          }
          state.globalDataLabels.data.push(item)
          state.constDataLabels.push(item)
          state.globalKeys.push(item)
        }
      }
    },
    getLocalData (state, paras) {
      // paras = ['X', 'Y', 'value', ...]
      var item, key, i, _length
      state.localData = []
      // state.filterData = []
      _length = state.globalData.length
      for (i = 0; i < _length; i++) {
        item = {}
        for (key of paras) {
          item[key] = state.globalData[i][key]
        }
        state.localData.push(item)
        // state.filterData.push(item)
      }
    },
    getFilterData (state, paras) {
      // paras = [
      //   {dimension: 'balabala', type: 'string', value: ['X', 'Y']},
      //   {dimension: 'X', type: 'number', value: [x1, x2]} (x1 <= x2)
      // ]
      var i, j, _data, _length, keep
      state.filterData = []
      _data = state.globalData
      _length = _data.length

      for (i = 0; i < _length; i++) {
        keep = true
        for (j = 0; j < paras.length; j++) {
          if (paras[j].type === 'string') {
            // console.log('STRING')
            if (paras[j].value.indexOf(_data[i][paras[j].dimension]) < 0) {
              keep = false
              // console.log(paras[j].value, _data[i][paras[j].dimension])
            }
          } else if (paras[j].type === 'number') {
            if (_data[i][paras[j].dimension] < paras[j].value[0] || _data[i][paras[j].dimension] > paras[j].value[1]) {
              keep = false
            }
          }
        }
        if (keep === true) {
          state.filterData.push(_data[i])
        }
      }
      // console.log('filterData', state.filterData)
    },
    filterStatistics (state, paras) {
      // paras = ['X', 'Y', 'value']
      var i, j, _length, ans, _max, _min
      _length = state.globalData.length
      ans = []
      state.filterCheckedList = []
      // console.log(state.globalData[0][paras[0]])
      for (i = 0; i < paras.length; i++) {
        ans.push({
          dimension: paras[i],
          type: 'string',
          value: []
        })
        // console.log(typeof state.globalData[0][paras[i]])
        if (typeof state.globalData[0][paras[i]] === 'string') {
          state.filterCheckedList.push({
            dimension: paras[i],
            type: 'string',
            value: []
          })
          for (j = 0; j < _length; j++) {
            if (ans[i].value.indexOf(state.globalData[j][paras[i]]) < 0) {
              ans[i].value.push(state.globalData[j][paras[i]])
              state.filterCheckedList[state.filterCheckedList.length - 1].value.push(state.globalData[j][paras[i]])
            }
          }
        } else if (typeof state.globalData[0][paras[i]] === 'number') {
          _max = -Infinity
          _min = Infinity
          for (j = 0; j < _length; j++) {
            _max = Math.max(_max, state.globalData[j][paras[i]])
            _min = Math.min(_min, state.globalData[j][paras[i]])
          }
          // console.log(_min, _max)
          // _delta = (_max - _min) / 5
          ans[i].dimension = 'number'
          ans[i].value.push(_min, _max)
        }
      }
      state.filterStatistics = ans
      // console.log(state.filterStatistics)
    }
  }
})

export {store}

import Vue from 'vue'
import Vuex from 'vuex'
import globalData from './globalData.json'
Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    globalData: globalData,
    globalKeys: [],
    globalDataLabels: {
      filter: [],
      page: [],
      data: [],
      X: [],
      Y: []
    },
    currentLabel: {}
  },
  mutations: {
    drag (state, paras) {
      console.log(paras, state)
      state.currentLabel = state.globalDataLabels[paras.component][paras.label]
      state.globalDataLabels[paras.component].splice(paras.label, 1)
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
        console.log(state.globalData)
        // let _keys = state.globalData[0].keys()
        let _keys = Object.keys(state.globalData[0])
        for (let i = 0; i < _keys.length; i++) {
          let item = {
            name: _keys[i],
            type: typeof state.globalData[0][_keys[i]]
          }
          state.globalDataLabels.data.push(item)
          state.globalKeys.push(item)
        }
      }
    }
  }
})

export {store}

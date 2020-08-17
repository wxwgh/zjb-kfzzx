import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const vm = new Vuex.Store({
  state: {
    map_list: [],
    data_list: [],
    editor_data: []
  },
  // 更新状态
  mutations: {
    get_map_list (state, data) {
      for (let i = 0; i < data.length; i++) {
        state.map_list.push(data[i])
      }
    },
    get_data_list (state, data) {
      for (let i = 0; i < data.length; i++) {
        state.data_list.push(data[i])
      }
    },
    get_editor_text (state, data) {
      state.editor_data.push(data)
    }
  },
  actions: {},
  modules: {}
})
export default vm

// 获取地图列表
axios({
  method: 'get',
  url: 'http://127.0.0.1:5000/map_list/get_map_list'
})
  .then(function (result) {
    const datas = result.data
    let index
    let mid_index
    for (let i = 0; i < datas.length; i++) {
      if (!datas[i].mid_node) {
        datas[i].mid_node = datas[i].tail_node
        datas[i].tail_node = ''
      }
      if (index >= 0) {
        if (datas[index].root_node === datas[i].root_node) {
          datas[index].root_row++
        } else {
          index = i
          datas[index].root_row = 1
        }
      } else {
        index = i
        datas[index].root_row = 1
      }
      if (mid_index >= 0) {
        if (datas[mid_index].mid_node === datas[i].mid_node) {
          datas[mid_index].mid_row++
        } else {
          mid_index = i
          datas[mid_index].mid_row = 1
        }
      } else {
        mid_index = i
        datas[mid_index].mid_row = 1
      }
    }
    vm.commit('get_map_list', datas)
  })
// 获取数据列表
axios({
  method: 'get',
  url: 'http://127.0.0.1:5000/data_list/get_data_list'
})
  .then(function (result) {
    const datas = result.data
    vm.commit('get_data_list', datas)
  })
// 获取编辑器内容
axios({
  method: 'get',
  url: 'map.html'
})
  .then(function (result) {
    vm.commit('get_editor_text', result.data)
  })

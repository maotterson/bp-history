import Vue from 'vue'
import Vuex from 'vuex'
import axios from'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    submittedData : {},
    currentResponse : {}
  },
  mutations: {
    setData(state,response){
      this.state.submittedData = {}
      if(response.status == 200){
        this.state.currentResponse = {
          data: response.data,
          success: true
        }
      }
      else{
        this.state.currentResponse = {
          data: {},
          success: false
        }
      }

    }
  },
  actions: {
    async postData({commit}, data){
      this.state.submittedData = data;
      const uri = '/api/users'
      const response = await axios.post(uri, data)
      commit('setData',response)
    }
  },
  modules: {
  }
})

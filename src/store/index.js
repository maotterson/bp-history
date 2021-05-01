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
    setReading(state,response){
      console.log(response)
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
    async postReading({commit}, data){
      this.state.submittedData = data;
      const id = "6087200906f1367ab8ca34ff";
      const uri = `/api/users/${id}/readings`
      const response = await axios.post(uri, data)
      commit('setReading',response)
    }
  },
  modules: {
  }
})

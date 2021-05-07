import Vue from 'vue'
import Vuex from 'vuex'
import axios from'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    submittedData : {},
    currentResponse : {},
    currentReadings: {},
    currentUserData: {},
    loggedIn: false
  },
  mutations: {
    setCurrentReading(state,response){
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
    },
    setCurrentReadings(state,response){
      console.log(response)
      this.state.currentReadings = {}
      if(response.status == 200){
        this.state.currentReadings = {
          data: response.data.body,
          success: true
        }
      }
      else{
        this.state.currentReadings = {
          data: [],
          success: false
        }
      }
    },
    setCurrentUserData(state,response){
      console.log(response)
      this.state.currentUserData = {}
      if(response.status == 200){
        this.state.currentUserData = {
          data: response.data.body,
          success: true
        }
      }
      else{
        this.state.currentUserData = {
          data: {},
          success: false
        }
      }
    },
    createLogin(state,response){
      console.log(response)
      if(response.status == 200){
        this.state.loggedIn = true;
      }
      else{
        this.state.loggedIn = false;
      }
    }
  },
  actions: {
    async postReading({commit}, data){
      this.state.submittedData = data;
      const id = "6087200906f1367ab8ca34ff";
      const uri = `/api/users/${id}/readings`
      const response = await axios.post(uri, data)
      commit('setCurrentReading',response)
    },
    async postUser({commit}, data){
      const uri = `/api/users`
      const response = await axios.post(uri,data);
      commit('setCurrentReading',response)
    },
    async getReadings({commit},data){
      const id = data.id;
      const uri = `/api/users/${id}/readings`
      const response = await axios.get(uri);
      commit('setCurrentReadings',response)
    },
    async getUserData({commit}, data){
      const id = data.id;
      const uri = `/api/users/${id}`
      const response = await axios.get(uri)
      commit('setCurrentUserData',response)
    },
    async updateUserData({commit}, data){
      const id = "6087200906f1367ab8ca34ff";
      const uri = `/api/users/${id}`
      const response = await axios.patch(uri,data)
      commit('setCurrentReading',response)
    },
    async updateReading({commit}, data){
      const userId = "6087200906f1367ab8ca34ff";
      const readingId = data.readingId;
      const uri = `/api/users/${userId}/readings/${readingId}`
      const response = await axios.patch(uri,data.body)
      commit('setCurrentReading',response)
    },
    async deleteUser({commit}, data){
      const id = "6087200906f1367ab8ca34ff";
      const uri = `/api/users/${id}`
      const response = await axios.delete(uri,data)
      commit('setCurrentReading',response)
    },
    async deleteReading({commit}, data){
      const userId = "6087200906f1367ab8ca34ff";
      const readingId = data.readingId;
      const uri = `/api/users/${userId}/readings/${readingId}`
      const response = await axios.delete(uri,data.body)
      commit('setCurrentReading',response)
    },
    async loginAttempt({commit}, loginData){
      const uri = `/api/login`
      const response = await axios.post(uri,loginData)
      console.log("attempt login")
      commit('createLogin', response)
    }
  },
  modules: {
  }
})

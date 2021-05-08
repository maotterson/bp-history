import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const jwt = require('jsonwebtoken')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    submittedData : {},
    currentResponse : {},
    currentReadings: {},
    currentUserData: {},
    token: {},
    loggedIn: false
  },
  mutations: {
    findToken(){
      const storedToken = localStorage.getItem('token')

      if(storedToken){
        this.state.token = storedToken
        const userData = jwt.decode(storedToken)
        this.state.currentUserData = {
          data: userData,
          success: true
        }
        this.state.loggedIn = true;
      }
      else{
        this.state.loggedIn = false;
      }
    },
    setTokenVerificationStatus(state,response){
      const storedToken = localStorage.getItem('token')
      if(response.status==200){
        this.state.token = storedToken
        const userData = jwt.decode(storedToken)
        this.state.currentUserData = {
          data: userData,
          success: true
        }
        this.state.loggedIn = true;
      }
      else{
        this.logOut();
      }
    },
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
        const userData = response.data.body ? response.data.body : jwt.decode(response.data.token)
        this.state.currentUserData = {
          data: userData,
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
        this.state.token = response.data.token;
        localStorage.setItem('token',response.data.token)
      }
      else{
        this.state.loggedIn = false;
        this.state.token = {};
      }
    },
    logOut(){
      localStorage.removeItem('token')
      this.state.token = {}
      this.state.loggedIn = false;
      this.state.currentUserData = {}
      this.state.currentReadings = {}
      this.state.submittedData = {}
    }
  },
  actions: {
    async verifyToken({commit}, data){
      const storedToken = localStorage.getItem('token')
      const uri = `/api/verify`
      // pass authentication options
      const authConfig = {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      }

      const response = await axios.post(uri,data,authConfig)
      commit('setTokenVerificationStatus',response)
    },
    async postReading({commit}, data){
      this.state.submittedData = data;
      const id = this.state.currentUserData.data.id;
      const uri = `/api/users/${id}/readings`

      // pass authentication options
      const authConfig = {
        headers: {
          'Authorization': `Bearer ${this.state.token}`
        }
      }

      const response = await axios.post(uri, data, authConfig)
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
      
      // pass authentication options
      const authConfig = {
        headers: {
          'Authorization': `Bearer ${this.state.token}`
        }
      }

      const response = await axios.get(uri,authConfig);
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
      commit('setCurrentUserData', response)
    }
  },
  modules: {
  }
})

<template>
  <div class="bg-white text-gray-700 flex flex-col items-center text-red-700 shadow-2xl p-12">
    <div>
      <span class="icon-heartbeat header-icon text-red-700"></span>
    </div>
    <h1 class="text-4xl">Login</h1>
    <form
      class="flex flex-col"
      v-on:submit.prevent="onSubmit"
      method="POST"
    >
      <BpInputRow>
        <label 
          for="username"
        >
          Username
        </label>
        <input 
          class="rounded p-4 border-2 border-gray-700 text-black w-full" 
          type="text" name="username" id="username"
        >
      </BpInputRow>
      <BpInputRow>
        <label 
          for="username"
        >
          Password
        </label>
        <input 
          class="rounded p-4 border-2 border-gray-700 text-black w-full" 
          type="password" name="password" id="password"
        >
      </BpInputRow>
      <input type="submit" value="Login">
    </form>
    <p
    @click="registerClick">Create New Account</p>
  </div>
</template>

<script>
import BpInputRow from '../input-form/bp-input-row'
export default {
  components:{
    BpInputRow
  },
  methods:{
    onSubmit($event){
      const loginData = {
        username: $event.target.elements.username.value,
        password: $event.target.elements.password.value
      }
      this.$store.dispatch('loginAttempt',loginData)
    },
    registerClick(){
      this.$store.commit('showRegister');
    }
  }
}
</script>

<style>

</style>
<template>
  <div class="bg-white text-gray-700 flex flex-col items-center text-red-700 shadow-2xl p-12">
    <div>
      <span class="icon-heartbeat header-icon text-red-700"></span>
    </div>
    <h1 class="text-4xl">Create Account</h1>
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
    <BpInputRow>
      <label 
        for="confirmpass"
      >
        Confirm Password
      </label>
      <input 
        class="rounded p-4 border-2 border-gray-700 text-black w-full" 
        type="password" name="confirmpass" id="onfirmpass"
      >
    </BpInputRow>
    <BpInputRow>
      <label 
        for="firstname"
      >
        First Name
      </label>
      <input 
        class="rounded p-4 border-2 border-gray-700 text-black w-full" 
        type="text" name="firstname" id="firstname"
      >
    </BpInputRow>
    <BpInputRow>
      <label 
        for="username"
      >
        Last Name
      </label>
      <input 
        class="rounded p-4 border-2 border-gray-700 text-black w-full" 
        type="text" name="lastname" id="lastname"
      >
    </BpInputRow>
      <input type="submit" value="Register">
    </form>
    <p
    @click="loginClick">Existing Account? Log In</p>
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
    loginClick(){
      this.$store.commit('showLogin')
    }
  }
}
</script>

<style>

</style>
<template>
  <div class="bg-white text-gray-700 flex flex-col items-center text-red-700 shadow-2xl p-12">
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
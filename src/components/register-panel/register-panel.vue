<template>
  <div>
    <form
      class="flex flex-col"
      v-on:submit.prevent="onSubmit"
      method="POST"
    >
      <label 
        for="username"
      >
        Username
      </label>
      <input 
        type="text" name="username" id="username"
      >
      <label 
        for="username"
      >
        Password
      </label>
      <input 
        type="password" name="password" id="password"
      >
      <label 
        for="confirmpass"
      >
        Confirm Password
      </label>
      <input 
        type="password" name="confirmpass" id="onfirmpass"
      >
      <label 
        for="firstname"
      >
        First Name
      </label>
      <input 
        type="text" name="firstname" id="firstname"
      >
      <label 
        for="username"
      >
        Last Name
      </label>
      <input 
        type="text" name="lastname" id="lastname"
      >
      <input type="submit" value="Register">
    </form>
  </div>
</template>

<script>
export default {
  methods:{
    onSubmit($event){
      const loginData = {
        username: $event.target.elements.username.value,
        password: $event.target.elements.password.value
      }
      this.$store.dispatch('loginAttempt',loginData)
    }
  }
}
</script>

<style>

</style>
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
      <input type="submit" value="Login">
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
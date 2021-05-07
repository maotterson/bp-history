<template>
  <Dashboard />
</template>

<script>
import Dashboard from "./views/Dashboard";
export default {
  components: { Dashboard },
  mounted(){
    // see if there is a stored bearer token
    this.$store.dispatch('verifyToken',null)
  }
}
</script>
<style>
  @import './assets/css/style.css';
</style>
<template>
  <div
    v-if="userData.data">
    {{userData.data}}
  </div>
</template>

<script>
export default {
  computed:{
    userData(){
      return this.$store.state.currentUserData;
    }
  },
  mounted(){
    const data = {
      id: "6087200906f1367ab8ca34ff"
    }
    this.$store.dispatch('getUserData',data)
  }
}
</script>

<style>

</style>
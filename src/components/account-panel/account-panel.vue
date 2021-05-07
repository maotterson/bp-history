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
    
  }
}
</script>

<style>

</style>
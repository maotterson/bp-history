<template>
  <div
    v-if="userData.data">
    {{userData.data}}
    <input type="button" @click="onLogOut" value="Log Out">
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
    
  },
  methods:{
    onLogOut(){
      this.$store.commit('logOut')
    }
  }
}
</script>

<style>

</style>
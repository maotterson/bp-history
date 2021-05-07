<template>
  <div
    v-if="readings.data"
  >
    <div
      v-for="reading in readings.data"
      :key="reading._id"
    >
    {{reading}}
  </div>
</template>

<script>
export default {
  computed:{
    readings(){
      return this.$store.state.currentReadings;
    }
  },
  mounted(){
    const userData = this.$store.state.currentUserData.data;
    console.log(userData)
    this.$store.dispatch('getReadings',userData)
  }
}
</script>

<style>

</style>
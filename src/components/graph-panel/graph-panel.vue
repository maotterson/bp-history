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
    const data = {
      id: "6087200906f1367ab8ca34ff"
    }
    this.$store.dispatch('getReadings',data)
  }
}
</script>

<style>

</style>
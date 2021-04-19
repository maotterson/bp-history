<template>
  <input
    class="rounded p-4 border-2 border-gray-700 text-black w-1/2" 
    :type="inputProps.type" 
    :name="inputProps.name"
    :id="inputProps.id"
    :size="inputProps.size ? inputProps.size : '' "
    :placeholder="inputProps.placeholder ? inputProps.placeholder : ''">
</template>

<script>
export default {
  props:['inputProps']
}
</script>

<style>

</style>
<template>
  <div class="bg-white text-gray-700 h-screen w-screen flex flex-col items-center">
    <div  >
      <img src="@/assets/logo.png" alt="Blood Pressure Logo">
    </div>
    <BpInputRow>
      <label class="flex-grow" for="date">Date</label>
      <BpInputText 
        :inputProps="inputs.dateProps"
      />
    </BpInputRow>
    <BpInputRow>
      <label class="flex-grow" for="bp">Blood Pressure</label>
      <div
        class="bp-container bg-white flex flex-row text-black rounded border-2 border-gray-700 p-4 w-1/2">
        <input
          class="mini-text w-12"
          name="" 
          id=""
          size="3"
          placeholder="120">
        <div>/</div>
        <input
          class="mini-text w-12"
          name="" 
          id=""
          size="3"
          placeholder="80">
      </div>
    </BpInputRow>
    <BpInputRow>
      <label class="flex-grow" for="hr">Heart Rate</label>
      <BpInputText 
        :inputProps="inputs.hrProps"
      />
    </BpInputRow>
    <BpInputRow>
      <input 
      class="border-2 p-4 text-black"
      type="button" value="Submit">
    </BpInputRow>
  </div>
</template>

<script>
import BpInputRow from './bp-input-row.vue'
import BpInputText from './bp-input-text.vue'
export default {
  components: { BpInputRow, BpInputText },
  data () {
      return {
          inputs : {
            dateProps : {
              type : "date",
              name: "date",
              id : "date"
            },
            bpProps : {
              type : "text",
              name: "bp",
              id : "bp",
              size: "3",
              placeholder:"120/80"
            },
            hrProps : {
              type : "text",
              name: "hr",
              id : "hr",
              size : "3",
              placeholder:"60"
            },
          }
      }
  },
}
</script>

<style>
:focus {
  outline:none;
  border-color:rgb(255, 118, 118) !important;
  background-color:rgb(255, 235, 235) !important;
}
.mini-text{
  background-color:parent;
}
.bp-container:focus-within>.mini-text{
  background-color:rgb(255, 235, 235) ;
}
.mini-text:focus{
  outline: none;
  border-width:0px;
  background-color:rgb(51, 133, 255) !important;
  color:white;
}

.bp-container:focus-within {
  border-color:rgb(255, 118, 118);
  background-color:rgb(255, 235, 235) !important;
}

</style>
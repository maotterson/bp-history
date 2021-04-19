<template>
  <div class="bg-red-600 text-gray-100">
    <div>
      <img src="@/assets/logo.png" alt="Blood Pressure Logo">
    </div>
    <BpInputRow>
      <label for="date">Date</label>
      <BpInputText 
        :inputProps="inputs.dateProps"
      />
    </BpInputRow>
    <BpInputRow>
      <label for="bp">Blood Pressure</label>
      <BpInputText 
        :inputProps="inputs.bpProps"
      />
    </BpInputRow>
    <BpInputRow>
      <label for="hr">Heart Rate</label>
      <BpInputText 
        :inputProps="inputs.hrProps"
      />
    </BpInputRow>
    <BpInputRow>
      <input type="button" value="Submit">
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
              id : "bp"
            },
            hrProps : {
              type : "text",
              name: "hr",
              id : "hr"
            },
          }
      }
  },
}
</script>

<style>

</style>
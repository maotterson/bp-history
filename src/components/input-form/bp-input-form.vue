<template>
  <div class="bg-white text-gray-700 flex flex-col items-center text-red-700 shadow-2xl p-12">
    <div>
      <span class="icon-heartbeat header-icon text-red-700"></span>
    </div>
    <BpInputRow>      
      <div class="flex flex-row mb-2">
        <span class="icon-droplet text-3xl  mr-2"></span>
        <label class="flex-grow text-3xl" for="date">Date</label>
      </div>
      <input
        class="rounded p-4 border-2 border-gray-700 text-black w-full" 
        type="date"
        v-on:focus="enterInput"
        v-on:blur="leaveInput"
        v-on:keyup="validateWhileTyping"
        v-on:change="validateWhileTyping"
        id="date">
    </BpInputRow>
    <BpInputRow>
      <div class="flex flex-row mb-2">
        <span class="icon-droplet text-3xl mr-2"></span>
        <label class="flex-grow text-3xl" for="bp">Blood Pressure</label>
      </div>
      <div
        class="bp-container bg-white flex flex-row text-black rounded border-2 border-gray-700 p-4 w-full"
        id="bp-container"
        ref="bpContainer"
        >
        <input
          class="mini-text w-12"
          ref="systInput"
          size="3"
          maxlength="3"
          placeholder="120"
          v-on:focus="enterInput"
          v-on:blur="leaveInput"
          v-on:keyup="validateWhileTyping"
          id="systolic">
        <div>/</div>
        <input
          class="mini-text w-12"
          ref="diasInput"
          size="3"
          placeholder="80"
          maxlength="3"
          v-on:focus="enterInput"
          v-on:blur="leaveInput"
          v-on:keyup="validateWhileTyping"
          id="diastolic">
          <div
            class="flex-grow"
            @click="clickBpDiv"></div>
      </div>
    </BpInputRow>
    <BpInputRow>
      <div class="flex flex-row mb-2">
        <span class="icon-heartbeat text-3xl mr-2"></span>
        <label class="flex-grow text-3xl" for="hr">Heart Rate</label>
      </div>
      <input
        class="rounded p-4 border-2 border-gray-700 text-black w-full" 
        type="text"
        size="3"
        maxlength="3"
        placeholder="60"
        v-on:focus="enterInput"
        v-on:blur="leaveInput"
        v-on:keyup="validateWhileTyping"
        id="pulse">
    </BpInputRow>
    <BpInputRow>
      <input
        :disabled='!submitEnabled'
        class="border-2 p-4 text-black"
        :class="submitEnabled ? 'bg-white color-black' : 'bg-gray-200 text-gray-400'"
        type="button" 
        :value="submitting? 'Adding Reading' : 'Add Reading'"
        @click="onSubmitClick"
        ref="button"
      >
    </BpInputRow>
    <div
      :v-if="currentResponse.success">
      Successfully created
    </div>
  </div>
</template>

<script>
import BpInputRow from './bp-input-row.vue'
export default {
  components: { BpInputRow },
  data () {
      return {
          rules: [
            { id: "date", rule: "date" },
            { id: "diastolic", rule: "digits" },
            { id: "systolic", rule: "digits" },
            { id: "pulse", rule: "digits" }
          ],
          submitEnabled : false,
          submitting : false
      }
  },
  computed:{
    currentResponse(){
      return this.$store.state.currentResponse;
    }
  },
  methods:{
    clickBpDiv(){
      this.$refs.systInput.focus()
    },
    enterInput($event){
      this.submitEnabled = false;
      this.validateWhileTyping();
      if($event.srcElement.id == 'systolic' || $event.srcElement.id == 'diastolic'){
        this.$refs.bpContainer.classList.remove('success')
        this.$refs.diasInput.classList.remove('success')
        this.$refs.systInput.classList.remove('success')
        this.$refs.bpContainer.classList.remove('error')
        this.$refs.diasInput.classList.remove('error')
        this.$refs.systInput.classList.remove('error')
      }
      else{
        $event.srcElement.classList.remove('error')
        $event.srcElement.classList.remove('success')
      }
    },
    leaveInput($event){
      if(this.validate($event.srcElement) && 
        !(($event.srcElement.id=='systolic')&&(!this.validate(this.$refs.diasInput))) &&
        !(($event.srcElement.id=='diastolic')&&(!this.validate(this.$refs.systInput)))
      ){
        if($event.srcElement.id == 'systolic' || $event.srcElement.id == 'diastolic'){
          this.$refs.bpContainer.classList.add('success')
          this.$refs.diasInput.classList.add('success')
          this.$refs.systInput.classList.add('success')
        }
        else{
          $event.srcElement.classList.add('success')
        }
        if(this.validateAllInputs()){
          this.submitEnabled = true;
        }
      }
      else{
        if($event.srcElement.id == 'systolic' || $event.srcElement.id == 'diastolic'){
          this.$refs.bpContainer.classList.add('error')
          this.$refs.diasInput.classList.add('error')
          this.$refs.systInput.classList.add('error')
        }
        else{
          $event.srcElement.classList.add('error')
        }
      }
    },
    validateAllInputs(){
      for(let i=0;i<this.rules.length;i++){
        if(!this.validate(document.getElementById(this.rules[i].id))){
          return false
        }
      }
      return true
    },
    validateWhileTyping(){
      if(this.validateAllInputs()){
        this.submitEnabled = true;
      }
      else{
        this.submitEnabled = false;
      }
    },
    validate(element){
      const rule = this.rules.find(rule => rule.id === element.id)
      if(rule.rule == "date"){
        let date;
        try{
          date = new Date(element.value)
          if(date.getFullYear()<2000 || date.getFullYear()>2021 || element.value==""){
            throw new Error("Invalid year")
          }
          return true
        }
        catch{
          return false
        }
      }
      else if(rule.rule == "digits"){
        if(element.value > 30 && element.value < 300){
          return true;
        }
        return false;
      }
      
    },
    onSubmitClick($event){
      console.log($event)
      this.submitEnabled = false;
      this.submitting = true;
      const requestData = {
        date : document.getElementById('date').value,
        systolic : document.getElementById('systolic').value,
        diastolic : document.getElementById('diastolic').value,
        pulse : document.getElementById('pulse').value
      }
      this.$store.dispatch('postData',requestData)
      //simulating a successful submission
      setTimeout(this.successfulSubmission, 200);
    },
    successfulSubmission(){
      this.rules.forEach(rule =>{
        document.getElementById(rule.id).value = "";
        document.getElementById(rule.id).classList.remove('success');
      })
      this.$refs.bpContainer.classList.remove('success')
      setTimeout(()=>{
        this.submitting = false;
      }, 1000);
      this.$refs.button.value="Added successfully"
    }
  },

}
</script>

<style>
:focus {
  outline:none;
  border-color:rgb(37, 168, 255) !important;
  background-color:rgb(188, 228, 255) !important;
}
.mini-text{
  background-color:parent;
}
.bp-container:focus-within>.mini-text{
  background-color:rgb(188, 228, 255) ;
}
.mini-text:focus{
  outline: none;
  border-width:0px;
  background-color:rgb(94, 158, 255) !important;
  color:white;
}

.bp-container:focus-within {
  border-color:rgb(37, 168, 255) !important;
  background-color:rgb(188, 228, 255) !important;
}
.error{
  border-color:rgb(219, 0, 0) !important;
  color:rgb(77, 0, 0) !important;
  background-color:rgb(255, 200, 200) !important;
}
.success{
  border-color:rgb(0, 231, 0) !important;
  background-color:rgb(227, 255, 227) !important;
  color:rgb(0, 131, 0) !important;
}
.header-icon{
  font-size:14rem;
}
</style>
<template>
  <div>
    <div class="flex flex-row w-full justify-center">
      <div 
        class="flex flex-col items-center"
        @click="clickNew">
        <span class="icon-new-message text-4xl"></span>
        <span>New</span>
      </div>
      <div class="flex flex-col items-center mx-8"
        @click="clickGraphs">
        <span class="icon-bar-chart text-4xl"></span>
        <span>Graphs</span>
      </div>
      <div class="flex flex-col items-center "
        @click="clickAccount">
        <span class="icon-user-circle text-4xl"></span>
        <span>Account</span>
      </div>
    </div>
    <BpInputForm
      class="w-screen"
      v-if="viewing == 'new'"/>
    <GraphPanel 
      class="w-screen"
      v-if="viewing == 'graphs'"/>
    <AccountPanel
      class="w-screen"
      v-if="viewing == 'account'"/>

  </div>
</template>

<script>
import BpInputForm from '../components/input-form/bp-input-form.vue';
import GraphPanel from '../components/graph-panel/graph-panel.vue';
import AccountPanel from '../components/account-panel/account-panel.vue';

export default {
  components:{
    BpInputForm,
    GraphPanel,
    AccountPanel
  },
  data () {
      return {
        viewing : 'new'
      }
  },
  methods:{
    clickNew(){
      this.viewing='new'
    },
    clickGraphs(){
      this.viewing='graphs'
    },
    clickAccount(){
      this.viewing='account'
    }
  }
}
</script>

<style>

</style>
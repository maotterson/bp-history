<template>
  <div>
    <div class="flex flex-col w-full items-center"
    v-if="loggedIn">
      <div class="flex flex-row w-full justify-center">
        <div 
          class="flex flex-col items-center px-10"
          :class="viewing == 'new' ? 'text-red-600 border-b-4 border-red-600' : 'text-black'"
          @click="clickNew">
          <span class="icon-new-message text-2xl"></span>
          <span>New</span>
        </div>
        <div 
          class="flex flex-col items-center mx-8 px-10"
          :class="viewing == 'graphs' ? 'text-red-600 border-b-4 border-red-600' : 'text-black'"
          @click="clickGraphs">
          <span class="icon-bar-chart text-2xl"></span>
          <span>Graphs</span>
        </div>
        <div 
          class="flex flex-col items-center px-10 "
          :class="viewing == 'account' ? 'text-red-600 border-b-4 border-red-600' : 'text-black'"
          @click="clickAccount">
          <span class="icon-user-circle text-2xl"></span>
          <span>Account</span>
        </div>
      </div>
      <BpInputForm
        class="md:w-1/2"
        v-if="viewing == 'new'"/>
      <GraphPanel 
        class="w-full"
        v-if="viewing == 'graphs'"/>
      <AccountPanel
        class="w-full"
        v-if="viewing == 'account'"/>
    </div>
    <div
      v-if="!loggedIn">
      <LoginPanel
        class="w-full"/>
      <RegisterPanel
        class="w-full"/>
    </div>
  </div>
</template>

<script>
import BpInputForm from '../components/input-form/bp-input-form.vue';
import GraphPanel from '../components/graph-panel/graph-panel.vue';
import AccountPanel from '../components/account-panel/account-panel.vue';
import LoginPanel from '../components/login-panel/login-panel.vue';
import RegisterPanel from '../components/register-panel/register-panel.vue';

export default {
  components:{
    BpInputForm,
    GraphPanel,
    AccountPanel,
    LoginPanel,
    RegisterPanel
  },
  data () {
      return {
        viewing : 'new'
      }
  },
  computed:{
    loggedIn(){
      return this.$store.state.loggedIn;
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
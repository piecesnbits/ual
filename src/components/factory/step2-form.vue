<template>
  <div>
    
    <my-input
     
      :value="authorityAccount"
      @input="authorityAccount = $event.toLowerCase()"
      color="secondary"
      label="Authority Account"
      hint="Account name must be 12 chars"
      counter
      maxlength="12"
      :rules="[
        val => !!val || '* Required',
        isValidAccountName,
        val => val.length == 12 || 'Must be exactly 12 chars',
        isAvailableAccountName
      ]"
      @statusChange="$store.commit('factory/setStepsData',{step:2, key:'authorityAccount', data: $event})"
    />
    <my-input
    
      :value="treasuryAccount"
      @input="treasuryAccount = $event.toLowerCase()"
      color="secondary"
      label="Treasury Account"
      hint="Account name must be 12 chars"
      counter
      maxlength="12"
      :rules="[
        val => !!val || '* Required',
        isValidAccountName,
        val => val.length == 12 || 'Must be exactly 12 chars',
        isAvailableAccountName
      ]"
      @statusChange="$store.commit('factory/setStepsData',{step:2, key:'treasuryAccount', data: $event})"
    />
  
  </div>
</template>

<script>
import myInput from 'components/form/my-input';
import {
  isValidAccountName,
  isAvailableAccountName
} from "../../imports/validators";
export default {
  // name: 'ComponentName',
  components:{
    myInput
  },
  data () {
    return {
      authorityAccount: this.$store.state.factory.stepsData[2].authorityAccount,
      treasuryAccount: this.$store.state.factory.stepsData[2].treasuryAccount
    }
  },
  methods:{
    isValidAccountName,
    isAvailableAccountName
  }
}
</script>

<style>
</style>

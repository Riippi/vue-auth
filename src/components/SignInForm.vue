<template>
  <div class="hello">
    Sign in Form here!<br>
    <input type="email" placeholder="email" v-model="email"><br>
    <input type="password" placeholder="password" v-model="password"><br>
    <input type="submit" value="Submit" @click="submit"><br>
    email: {{email}} - password: {{password}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SignInForm extends Vue {
 
  email: string = '';
  password: string = '';


  submit(): void {
    this.$store.dispatch('login', {email: this.email, password: this.password})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

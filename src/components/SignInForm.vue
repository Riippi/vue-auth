<template>
  <div class="hello">
    Log in here<br>
    <input type="email" placeholder="email" v-model="email"><br>
    <input type="password" placeholder="password" v-model="password"><br>
    <input type="submit" value="Submit" @click="submit"><br>
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


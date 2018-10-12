<template>
  <div class="sign-in">
    <SignInForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignInForm from '@/components/SignInForm.vue'; // @ is an alias to /src

@Component({
  components: {
    SignInForm,
  },
})
export default class SignIn extends Vue {}
</script>

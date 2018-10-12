<template>
  <div class="sign-up">
    <SignUpForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SignUpForm from "@/components/SignUpForm.vue"; // @ is an alias to /src

@Component({
  components: {
    SignUpForm
  },
})
export default class SignUp extends Vue {}
</script>

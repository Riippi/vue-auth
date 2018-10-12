<template>
  <div class="home">
    <HelloWorld v-if="auth" msg="Vue.js + TypeScript + Firebase"/>
    <div v-else>Pls log in</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  }
})
export default class Home extends Vue {}
</script>

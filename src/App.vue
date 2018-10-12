<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="auth" to="/about">About</router-link> |
      <router-link v-if="!auth" to="/sign-up">Sign Up</router-link> |
      <router-link v-if="!auth" to="/sign-in">Sign In</router-link> |
      <button v-if="auth" @click="onLogout">Sign Out</button>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  get auth() {
    return this.$store.getters.isAuthenticated;
  }

  onLogout() {
    this.$store.dispatch("logout");
  }

  created() {
    this.$store.dispatch("tryAutoLogin");
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

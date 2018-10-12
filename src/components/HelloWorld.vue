<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="note in notes" v-bind:key="note.id">{{note.text}}<button @click="deleteNote(note.id)">Delete</button></div>
    <br>
    <input type="text" placeholder="new note" v-model="note" @keyup.enter="submit"><br>
    <input type="submit" value="Add note" @click="submit"><br>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop()
  private msg!: string;

  note: string = "";

  submit(): void {
    this.$store.dispatch("storeNote", { text: this.note });
    this.note = '';
  }

  deleteNote(id: string) {
    this.$store.dispatch("deleteNote", id);
  }

  get notes(): Object[] {
    return this.$store.getters.notes;
  }

  mounted() {
    this.$store.dispatch("fetchNotes");
    console.log(process.env.VUE_APP_NAME);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

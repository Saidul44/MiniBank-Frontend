<template>
  <v-app class="grey lighten-4 main">
    <v-app id="inspire">
      <navbar />
      <v-content class="mx-4 pa-0">
        <v-snackbar :color="snackbarType" :timeout="3000" top v-model="snackbar">
          {{ snackMsg }}
          <v-btn color="white" flat @click="snackbarClose">
            <v-icon>close</v-icon>
          </v-btn>
        </v-snackbar>
        <router-view></router-view>
      </v-content>
    </v-app>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },
  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar;
      },
      set(val) {
        this.$store.commit("responseMsgRmv");
      }
    },
    snackbarType() {
      return this.$store.state.snackbarType;
    },
    snackMsg() {
      return this.$store.state.responseMsg;
    }
  },
  methods: {
    snackbarClose() {
      this.$store.commit("responseMsgRmv");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

html,
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  /* font-family: "Ubuntu", sans-serif; */
}

#inspire {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  /* font-family: "Ubuntu", sans-serif; */
}

.main {
  padding: 0px;
}
</style>

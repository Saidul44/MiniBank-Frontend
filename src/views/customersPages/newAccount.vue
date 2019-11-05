<template>
  <v-container>
    <v-layout>
      <v-flex md3></v-flex>
      <v-flex md6>
        <v-select v-model="account_type" :items="getAccType" label="Select Account type"></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md8></v-flex>
      <v-flex md2>
        <v-btn color="primary" @click.prevent="create">Create</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    account_type: ""
  }),
  computed: {
    getAccType() {
      return ["Savings Account", "Current Account", "Deposit Account"];
    }
  },

  methods: {
    create() {
      console.log(this.account_type);
      this.$store.dispatch("createAccount", this.account_type);
    }
  }
};
</script>
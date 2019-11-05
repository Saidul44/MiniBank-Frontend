<template>
  <v-container>
    <h1 align="center" style="color: grey;">Account Balance</h1>
    <v-layout row wrap class="mt-4">
      <v-flex md3></v-flex>
      <v-flex md6>
        <v-combobox
          v-model="customerInfo"
          :items="accountInfo"
          item-text="accNo"
          item-value="accNo"
          item-disabled
          label="Select Account"
          outline
          open-on-clear
          @input="accountDetails"
        >
          <template v-slot:item="data">
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.accNo"></v-list-tile-title>
              <v-list-tile-sub-title
                v-html="'Name: ' +data.item.name +', Type: '+ data.item.acc_type"
              ></v-list-tile-sub-title>
            </v-list-tile-content>
            <!-- <v-btn small fab dark color="cyan darken-2" slot="activator" @click="addOldPatientSchedule(data.item)">
                    <v-icon>add</v-icon>
            </v-btn>-->
          </template>
        </v-combobox>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex md3></v-flex>
      <v-flex md6>
        <div class="data_table" v-if="showData">
          <table>
            <tr>
              <th>Account No</th>
              <td>
                <b>{{ this.customerInfo.accNo }}</b>
              </td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{{ this.customerInfo.name }}</td>
            </tr>
            <tr>
              <th>User Type</th>
              <td>{{ this.customerInfo.acc_type }}</td>
            </tr>
            <tr>
              <th style="color: #007bff;">Balance</th>
              <td style="color: #007bff;">€ {{ this.balance }}</td>
            </tr>
          </table>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    customerInfo: "",
    showData: false,
    balance: 0
  }),
  created() {
    this.fetchData();
  },
  computed: {
    accountInfo() {
      console.log(this.$store.getters.getAccountInfo);
      return this.$store.getters.getAccountInfo;
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch("getAccountInfo");
    },
    accountDetails(item) {
      if (item) {
        this.$store
          .dispatch("getCustomerBalance", item.accNo)
          .then(response => {
            this.balance = response.data.customer_balance.balance;
          });
        this.showData = true;
      }
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 992px) {
  .data_table {
    position: relative;
    margin-top: 40px;
    width: 100%;
  }
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
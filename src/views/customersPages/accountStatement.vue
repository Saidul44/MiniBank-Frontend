<template>
  <v-container>
    <h1 align="center" style="color: grey;">Account Statement</h1>

    <v-layout row wrap class="mt-4">
      <v-flex md2></v-flex>
      <v-flex md2>
        <v-combobox
          v-model="customerInfo"
          :items="accountInfo"
          item-text="accNo"
          item-value="accNo"
          item-disabled
          label="Select Account No"
          open-on-clear
        >
          <template v-slot:item="data">
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.accNo"></v-list-tile-title>
              <v-list-tile-sub-title v-html=" data.item.name +','+ data.item.acc_type"></v-list-tile-sub-title>
            </v-list-tile-content>
            <!-- <v-btn small fab dark color="cyan darken-2" slot="activator" @click="addOldPatientSchedule(data.item)">
                    <v-icon>add</v-icon>
            </v-btn>-->
          </template>
        </v-combobox>
      </v-flex>
      <v-flex md2 class="ml-5">
        <v-menu>
          <v-text-field
            :value="viewDateFormate(fromDate)"
            slot="activator"
            label="From date"
            append-icon="date_range"
          ></v-text-field>
          <v-date-picker v-model="fromDate"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md2 class="ml-5">
        <v-menu>
          <v-text-field
            :value="viewDateFormate(toDate)"
            slot="activator"
            label="To date"
            append-icon="date_range"
          ></v-text-field>
          <v-date-picker v-model="toDate"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md2 class="ml-5">
        <v-btn small fab color="primary" @click.prevent="search">
          <v-icon>search</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-3">
      <v-flex md2></v-flex>
      <v-flex md8>
        <div v-if="showData">
          <v-layout row wrap>
            <v-flex md4>
              <v-layout row wrap class="information">
                <v-flex>
                  <p>
                    Account No:
                    <b>{{ customerInfo.accNo }}</b>
                  </p>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md4>
              <v-layout row wrap class="information">
                <v-flex>
                  <p>
                    Name:
                    <b>{{ customerInfo.name }}</b>
                  </p>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md4>
              <v-layout row wrap class="information">
                <v-flex>
                  <p>
                    Account Type:
                    <b>{{ customerInfo.acc_type }}</b>
                  </p>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md1></v-flex>
      <v-flex md10>
        <div class="data_table" v-if="showData">
          <table class="table">
            <thead>
              <tr>
                <th v-for="(column, index) in columns" :key="index">{{column}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td v-for="(column, indexColumn) in columns" :key="indexColumn">{{item[column]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Format from "date-fns/format";

export default {
  data: () => ({
    showData: false,
    customerInfo: "",
    accountType: "",
    fromDate: "",
    toDate: "",

    inputRules: [v => !!v || "This Field is required"],
    columns: [
      "Date",
      "Transaction",
      "Remarks",
      "Deposit(€)",
      "Withdraw(€)",
      "Balance(€)"
    ]
  }),
  created() {
    this.fetchData();
  },
  computed: {
    items() {
      return this.$store.getters.getStatements;
    },
    accountInfo() {
      console.log(this.$store.getters.getAccountInfo);
      return this.$store.getters.getAccountInfo;
    },
    customerDetails() {
      console.log(this.$store.getters.getAccountInfo);
      //   return this.$store.getters.getCustomerDetails;
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch("getAccountInfo");
      this.$store.state.statements = [];
    },
    viewDateFormate(date) {
      return date ? Format(date, "YYYY MMM Do") : "";
    },
    search() {
      this.$store.state.statements = [];
      var items = {
        accno: this.customerInfo.accNo,
        startDate: this.fromDate,
        endDate: this.toDate
      };
      this.$store.dispatch("accountStatement", items);
      this.showData = true;
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 992px) {
  .data_table {
    position: relative;
    margin-top: 10px;
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
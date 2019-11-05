<template>
  <v-container v-on:keyup.enter="register" color="primary">
    <div class="row">
      <v-layout wrap row>
        <v-flex md3></v-flex>
        <v-flex md6>
          <div class="panel text-left">
            <h1 align="center" style="color: grey;">Deposit</h1>
            <v-form ref="form" lazy-validation class="mt-4">
              <v-combobox
                v-model="accountNumber"
                :items="accountInfo"
                item-text="accNo"
                item-value="accNo"
                item-disabled
                label="Select Account"
                open-on-clear
              >
                <template v-slot:item="data">
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.accNo"></v-list-tile-title>
                    <v-list-tile-sub-title
                      v-html="'Name: ' +data.item.name +', Type: '+ data.item.acc_type"
                    ></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </v-combobox>

              <v-text-field v-model="amount" type="number" label="Amount" required></v-text-field>

              <v-text-field v-model="remarks" label="Remarks"></v-text-field>
              <v-btn color="primary" @click.prevent="submit">Submit</v-btn>
            </v-form>
          </div>
        </v-flex>
        <v-flex md3></v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    accountNumber: "",
    amount: "",
    remarks: ""
  }),
  created() {
    this.fetchData();
  },
  computed: {
    accountInfo() {
      // console.log(this.$store.getters.getUserInfo);
      return this.$store.getters.getAccountInfo;
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch("getAccountInfo");
    },
    accountDetails(item) {
      console.log(item);
      this.accountType = item.type;
      this.name = item.name;
    },
    submit() {
      var itemData = {
        account_id: this.accountNumber.accNo,
        amount: this.amount,
        remarks: this.remarks
      };
      this.$store.dispatch("saveDeposite", itemData).then(response => {
        (this.accountNumber = ""), (this.amount = ""), (this.remarks = "");
      });
    }
  }
};
</script>

<style scoped>
</style>
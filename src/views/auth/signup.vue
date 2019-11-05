<template>
  <v-container v-on:keyup.enter="register" color="primary">
    <div class="row">
      <v-layout wrap row>
        <v-flex md3></v-flex>
        <v-flex md6>
          <div class="panel text-left">
            <h1 align="center">Create Account</h1>
            <v-form ref="form" v-model="valid" lazy-validation class="mt-4">
              <v-layout wrap>
                <v-flex md6>
                  <v-text-field
                    v-model="allFormData.name"
                    :rules="[v => !!v || 'Name is required']"
                    label="Name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex md1></v-flex>
                <v-flex md5>
                  <v-text-field
                    v-model="allFormData.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex md6>
                  <v-text-field
                    v-model="allFormData.address"
                    :rules="[v => !!v || 'Address is required']"
                    label="Address"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex md1></v-flex>
                <v-flex md5>
                  <v-text-field
                    v-model="allFormData.phone"
                    :rules="[v => !!v || 'Mobile number is required']"
                    label="Mobile"
                    type="number"
                    required
                    small
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-select
                v-model="allFormData.account_type"
                :items="getAccType"
                label="Select Account Type"
              ></v-select>
              <v-text-field
                v-model="allFormData.password"
                type="password"
                :rules="passwordRules"
                label="Password"
                required
              ></v-text-field>

              <v-text-field
                v-model="allFormData.password_confirmation"
                type="password"
                :rules="[confirmPasswordRules,passwordRules]"
                label="Confirm Password"
                required
              ></v-text-field>

              <p v-if="show1" class="error">the password you have given do not match</p>

              <v-btn :disabled="!valid" color="success" @click.prevent="register">Submit</v-btn>

              <v-btn color="error" @click="reset">Reset Form</v-btn>
            </v-form>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    allFormData: {
      name: "",
      email: "",
      password: null,
      password_confirmation: null,
      address: "",
      phone: "",
      account_type: ""
    },

    show1: false,
    emailRules: [
      v => !!v || "E-mail is required",
      // v => /.+.@.+/.test(v) || "E-mail must be valid"
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid"
    ],

    passwordRules: [
      v => !!v || "password is required",
      v => (v && v.length > 5) || "minimum 6 characters"
    ]
  }),

  created() {},
  computed: {
    confirmPasswordRules() {
      return () =>
        this.allFormData.password === this.allFormData.password_confirmation ||
        "Password must match";
    },
    getAccType() {
      return ["Savings Account", "Current Account", "Deposit Account"];
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.allFormData).then(response => {
        if (!response.data.error) {
          this.$router.push("/");
        }
      });
    },
    validate() {
      if (this.allFormData.password != this.allFormData.password_confirmation) {
        return (this.show1 = true);
      } else {
        this.show1 = false;
      }

      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
.signup-form-header {
  background-color: transparent;
  border: 0;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
  text-shadow: none;
}
.auth-form-header h1 {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -0.5px;
}

#heading {
  margin-top: 150px;
}
#img {
  width: auto;
  height: 85%;
}

#reg {
  color: #333;
  font-size: 40px;
}

.section-1 {
  padding: 0.1vmin 0;
}

.section-1 .row .col-md-6 .pray img {
  opacity: 1;
  width: 80%;
  height: 600px;
  border-radius: 0.2em;
}

.section-1 .row .col-md-6:last-child {
  position: relative;
}

.section-1 .row .col-md-6 .panel {
  position: absolute;
  top: 7vmin;
  left: -30vmin;
  background: white;
  border-radius: 3px;
  text-align: left;
  padding: 5vmin 5vmin 5vmin 5vmin;
  box-shadow: 0px 25px 42px rgba(0, 0, 0, 0.2);
  /* font-family: var(--Rubik); */
  z-index: 1;
}

.section-1 .row .col-md-6 .panel h1 {
  font-weight: bold;
  padding: 0.4em 0;
  font-size: 2em;
}

.section-1 .row .col-md-6 .panel p {
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.5);
}

@media only screen and (max-width: 768px) {
  .section-1 .row .col-md-6 .panel {
    position: initial;
    width: initial;
    height: initial;
  }
}
</style>
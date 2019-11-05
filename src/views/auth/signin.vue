<template>
  <v-container v-on:keyup.enter="login">
    <v-card width="700" class="mx-auto mt-5">
      <v-card-title text-md-center>
        <div class="heding">
          <h1>
            LOGIN
            <span>TO PRESCRIPTION</span>
          </h1>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="allLogData.email"
            :rules="emailRules"
            label="E-mail"
            required
            prepend-icon="account_circle"
          ></v-text-field>

          <v-text-field
            v-model="allLogData.password"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            label="Password"
            prepend-icon="lock"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            v-if="allLogData.email && allLogData.password"
            color="success"
            @click.prevent="login"
          >Submit</v-btn>

          <v-btn color="error" @click="reset">Reset Form</v-btn>

          <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <router-link to="/signup" style="text-decoration: none;">
          <span>Not Registered ?</span>
        </router-link>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    showPassword: false,
    allLogData: {
      email: "",
      password: ""
    },
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+.@.+/.test(v) || "E-mail must be valid"
    ],

    password: null,
    passwordRules: [
      v => !!v || "password is required",
      v => (v && v.length > 5) || "minimum 6 characters"
    ]
  }),

  methods: {
    login() {
      this.$store
        .dispatch("retrieveToken", {
          email: this.allLogData.email,
          password: this.allLogData.password
        })
        .then(response => {
          if (!response.data.error) {
            this.$router.push("/");
          } else {
            (this.allLogData.email = ""), (this.allLogData.password = "");
          }
        });
    },
    validate() {
      if (this.password != this.confirm_password) {
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
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style scoped>
.heding h1 {
  color: grey;
}
.auth-form-header {
  /* background-color: transparent;
  border: 0;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
  text-shadow: none; */
}
.auth-form-header h1 {
  /* font-size: 24px;
  font-weight: 300;
  letter-spacing: -0.5px; */
}
.auth-form-footer {
  /* background-color: transparent;
  border: 0;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
  text-shadow: none; */
}
.auth-form-footer h1 {
  /* font-size: 15px;
  font-weight: 300;
  letter-spacing: -0.5px;
  color: #3700b3; */
}

.login-box-bottom {
  /* width: 400px;
  height: 390px; */
  /* background-color: #1f9fe6; */
  /* background-color: #fff;
  top: 58%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 15px 30px;
  border-style: solid;
  border-width: 0px 1px 1px 1px;
  border-color: #0067bd; */
}
.loging-box-top {
  /* width: 400px;
  height: 70px;
  background-color: #0067bd;
  top: 15%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%); */
}
.avatar {
  /* width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: -50px;
  left: calc(50% - 50px); */
}
h1 {
  /* margin: 0;
  padding: 0 0 20px;
  text-align: center;
  font-size: 22px;
  color: #000; */
}
</style>
<template>
  <nav>
    <v-navigation-drawer
      v-if="loggedIn"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      absolute
      temporary
      app
    >
      <v-list dense>
        <template v-for="item in getNavList">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <!-- <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>-->
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile v-for="(child, i) in item.children" :key="i" router :to="child.route">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" router :to="item.route">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" class="navbar" color="white" app fixed>
      <v-toolbar-title style="width: 200px" class="grey--text ml-0 pl-3" color="grey">
        <v-toolbar-side-icon
          v-if="loggedIn"
          @click.stop="drawer = !drawer"
          class="navigationDrawer"
        ></v-toolbar-side-icon>
        <span class="hidden-sm-and-down" style="color: rgb(54, 155, 206);">MiniBank</span>
      </v-toolbar-title>
      <div class="Menu" v-if="loggedIn">
        <div class="home">
          <router-link to="/" class="navBtn" tag="button" style="color: #1967c0;">Home</router-link>
        </div>
        <div class="home">
          <router-link
            to="/account-info"
            class="navBtn"
            tag="button"
            style="color: #1967c0;"
          >Account Info</router-link>
        </div>
        <div class="home">
          <router-link
            to="/account-balance"
            class="navBtn"
            tag="button"
            style="color: #1967c0;"
          >Account Balance</router-link>
        </div>
        <div class="home">
          <router-link to="/deposit" class="navBtn" tag="button" style="color: #1967c0;">Deposit</router-link>
        </div>
        <div class="home">
          <router-link
            to="/fund-transfer"
            class="navBtn"
            tag="button"
            style="color: #1967c0;"
          >Fund Transfer</router-link>
        </div>
        <div class="home">
          <router-link
            to="/account-statement"
            class="navBtn"
            tag="button"
            style="color: #1967c0;"
          >Account Statement</router-link>
        </div>
        <div class="home">
          <router-link
            to="/new-account"
            class="navBtn"
            tag="button"
            style="color: #1967c0;"
          >New Account</router-link>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-btn flat round v-if="!loggedIn" to="/signin">
        <span>Sign in</span>
      </v-btn>
      <v-btn flat outline round v-if="!loggedIn" to="/signup">
        <span>Sign up</span>
      </v-btn>
      <div class="dropdown">
        <button class="dropbtn" style="color:#1967c0;" v-if="loggedIn">
          {{ userInfo.name }}
          <v-icon>arrow_drop_down</v-icon>
        </button>
        <div class="dropdown-content">
          <router-link to="/signout">Logout</router-link>
        </div>
      </div>
    </v-toolbar>
    <v-img src="../navbarShadow.png" class="header_shadow"></v-img>
  </nav>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    drawer: false,
    items: [
      { title: "Profile", route: "/" },
      { title: "Sign Out", route: "/signout" }
    ]
  }),
  props: {
    source: String
  },
  created() {},
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    userInfo() {
      console.log(this.$store.getters.getUserInfo);
      return this.$store.getters.getUserInfo;
    },
    getNavList() {
      return [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          text: "",
          model: true,
          children: [
            {
              icon: "list",
              text: "Account Info",
              route: "/account-info"
            },
            {
              icon: "list",
              text: "Account Balance",
              route: "/account-balance"
            }
          ]
        },
        {
          icon: "list",
          text: "Deposit",
          route: "/deposit"
        },
        {
          icon: "list",
          text: "Fund Transfer",
          route: "/fund-transfer"
        },
        {
          icon: "list",
          text: "Account Statement",
          route: "/account-statement"
        },
        {
          icon: "list",
          text: "New Account",
          route: "/new-account"
        }
      ];
    }
  },
  methods: {}
};
</script>


<style>
.v-toolbar {
  height: 60px;
  box-shadow: 0px 1px 0px -1px #d3e0e9, 0px 1px 0px 0px #d3e0e9,
    0px 1px 0px 0px #d3e0e9;
}
.dropDownMenu {
  border-top: 6px solid rgb(51, 153, 204);
}
.hover {
  box-shadow: rebeccapurple;
}

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 14px;
  border: none;
  outline: none;
  /* color: white; */
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  /* color: #777; */
  color: red;
}
.home {
  float: left;
  overflow: hidden;
  margin-top: 20px;
  color: red;
}

.home .navBtn {
  font-size: 14px;
  border: none;
  outline: none;
  text-decoration: none;
  color: red;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  color: #777;
}

.home .navBtn a {
  float: none;
  color: red;
  text-decoration: none;
  text-align: left;
  color: #777;
}
.dropdown-content {
  border-top: 6px solid rgb(51, 153, 204);

  display: none;
  position: absolute;
  /* background-color: #f9f9f9; */
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  color: #777;
}
.dropdown-content {
  background-color: #fff;
}
.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.navigationDrawer {
  display: none;
}
@media (max-width: 885px) {
  .Menu {
    display: none;
  }
  .navigationDrawer {
    display: inline;
  }
}

.header_shadow {
  margin-top: 57px;
  display: block;
  height: auto;
  width: 100% !important;
}
</style>
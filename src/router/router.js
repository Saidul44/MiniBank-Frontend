import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AuthHandler from '../views/auth/authHandler'
import Signin from '../views/auth/signin'
import Signup from '../views/auth/signup'
import Signout from '../views/auth/signout'
import AccountBalance from '../views/customersPages/accountBalance'
import FundTransfer from '../views/customersPages/fundTransfer'
import AccountInfo from '../views/customersPages/accountInfo'
import Deposit from '../views/customersPages/deposit'
import AccountStatement from '../views/customersPages/accountStatement'
import NewAccount from '../views/customersPages/newAccount'
import {
  store
} from '../store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/deposit',
    name: 'deposit',
    component: Deposit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account-balance',
    name: 'accountBalance',
    component: AccountBalance,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/fund-transfer',
    name: 'fundTransfer',
    component: FundTransfer,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account-info',
    name: 'accountInfo',
    component: AccountInfo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account-statement',
    name: 'accountStatement',
    component: AccountStatement,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new-account',
    name: 'newAccount',
    component: NewAccount,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/signout',
    name: 'signout',
    component: Signout,
    meta: {
      requiresAuth: true
    }
  },

  ]
})


export default router;
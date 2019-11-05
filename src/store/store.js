import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1'
const frontEndUrl = 'http://localhost:8080/'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,

    users: [],
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    responseMsg: '',
    snackbar: false,
    snackbarType: 'success',
    headerType: '',
    setEmailForPassReset: '',


    accountInfo: [],
    customerDetails: [],
    statements: []
  },

  getters: {
    getAccountInfo: (state) => {
      return state.accountInfo
    },
    getCustomerDetails: (state) => {
      return state.customerDetails
    },
    getStatements: (state) => {
      return state.statements
    },
    loggedIn(state) {
      return state.token !== null
    },
    getUserInfo: (state) => {
      return state.userInfo
    },
    getUsers: (state) => {
      return state.users
    },
  },
  mutations: {
    getUsers(state, users) {
      state.users = [];
      users.map(function (user) {
        state.users.push({
          'id': user.id,
          'name': user.name,
          'email': user.email,
          'user_type': user.user_type
        });
      });
    },
    setUsers(state, user) {
      state.users.push({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'user_type': user.user_type
      });

    },
    userInfo(state, data) {
      state.userInfo = data
    },
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state, token) {
      state.token = null
    },
    setResponseMsg: (state, response) => {
      console.log(response)
      state.responseMsg = response.data.resMsg
      if (state.responseMsg.length > 0) {
        state.snackbar = true
      }

      state.snackbarType = 'success'
      if (response.data.error) {
        state.snackbarType = 'error'
      }

    },
    responseMsgRmv(state) {
      state.responseMsg = '';
      if (state.responseMsg.length == 0) {
        state.snackbar = false
      }
    },

    setAccountInfo(state, data) {
      state.customerDetails = data
      state.accountInfo = []
      data.accounts.map(function (info) {
        state.accountInfo.push({
          'accNo': info.id,
          'name': data.name,
          'acc_type': info.account_type
        });
      })
    },
    getStatement(state, data) {
      state.statements[0] = {
        'Transaction': "Balance B/D",
        'Balance(€)': data.balanceBD
      }

      data.statementData.map(function (statement) {
        state.statements.push({
          'Date': statement.created_at,
          'Transaction': statement.transaction,
          'Remarks': statement.remarks,
          'Deposit(€)': statement.debit,
          'Withdraw(€)': statement.credit,
          'Balance(€)': statement.balance
        })
      })

      console.log(state.statements)
    }

  },
  actions: {
    register(context, data) {
      console.log(data)
      const params = new URLSearchParams()
      params.append('name', data.name)
      params.append('address', data.address)
      params.append('account_type', data.account_type)
      params.append('email', data.email)
      params.append('password', data.password)
      params.append('password_confirmation', data.password_confirmation)
      params.append('contact_no', data.phone)

      return new Promise((resolve, reject) => {
        axios.post('/register', params)
          .then(response => {
            if (response.data.error) {
              context.commit('setResponseMsg', response)
            } else {
              const token = response.data.token

              localStorage.setItem('token', token)
              context.commit('retrieveToken', token)
              localStorage.setItem('userInfo', JSON.stringify(response.data.user))
              // console.log(JSON.parse(localStorage.getItem('userInfo')))
              context.commit('userInfo', response.data.user)
            }

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        const params = new URLSearchParams()
        params.append('email', credentials.email)
        params.append('password', credentials.password)

        axios.post('/login', params)
          .then(response => {
            if (response.data.error) {
              context.commit('setResponseMsg', response)
            } else {
              const token = response.data.token

              localStorage.setItem('token', token)
              context.commit('retrieveToken', token)
              localStorage.setItem('userInfo', JSON.stringify(response.data.user))
              // console.log(JSON.parse(localStorage.getItem('userInfo')))
              context.commit('userInfo', response.data.user)
            }

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    async destroyToken(context) {
      const token = await "Bearer ".concat(context.state.token)

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.get('/logout', {
            headers: {
              Authorization: token
            }
          })
            .then(response => {
              localStorage.removeItem('token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              console.log(error)
            })
        })
      }
    },

    getAccountInfo(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.get('/customer-info')
            .then(response => {
              console.log(response.data.user)
              context.commit('setAccountInfo', response.data.user)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    getCustomerBalance(context, accNo) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.get('/customer-balance/' + accNo)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    saveDeposite(context, data) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/deposit', data)
            .then(response => {

              context.commit('setResponseMsg', response)

              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    fundTransfer(context, data) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/fund-transfer', data)
            .then(response => {

              context.commit('setResponseMsg', response)

              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    createAccount(context, data) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      var account_type = {
        account_type: data
      };
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/new-account-request', account_type)
            .then(response => {

              context.commit('setResponseMsg', response)

              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    accountStatement(context, data) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.get('/statement?' + 'account_no=' + data.accno + '&' + 'start_date=' + data.startDate + '&' + 'end_date=' + data.endDate)
            .then(response => {
              console.log(response.data)
              context.commit('getStatement', response.data)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    }
  }
})
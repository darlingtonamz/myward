import auth from '@/api/auth'
const state = {
  authenticated: !!localStorage.getItem('access_token'),
  accessToken: localStorage.getItem('access_token'),
  idToken: localStorage.getItem('id_token'),
  expiresAt: localStorage.getItem('expires_at')
}

const getters = {
  authenticated (state) {
    return state.authenticated
  }
}

const mutations = {
  setSession(state, authData) {
    state.authenticated = true
    state.accessToken = authData.accessToken
    state.idToken = authData.idToken
    state.expiresAt = authData.expiresIn * 1000 + new Date().getTime()

    localStorage.setItem('access_token', state.accessToken)
    localStorage.setItem('id_token', state.idToken)
    localStorage.setItem('expires_at', state.expiresAt)
  },
  logout(state) {
    state.authenticated = false
    state.accessToken = null
    state.idToken = false

    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  }
}

const actions = {
  login() {
    auth.login()
  },
  logout({ commit }) {
    commit('logout')
  },
  handleAuthentication({ commit }) {
    auth.handleAuthentication().then(result => {
      commit('setSession', result)
    }).catch(err => {
      // console.log(err)
      return err
    })
  },
  renewSession({ commit }) {
    auth.renewSession().then(result => {
      commit('setSession', result)
    }).catch(err => {
      // console.log(err)
      return err
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
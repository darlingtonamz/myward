import auth from '@/api/auth'
const state = {
  authenticated: !!localStorage.getItem('access_token'),
  authMessage: localStorage.getItem('access_token') ? 'Authenticated' : 'Not Authenticated',
  accessToken: localStorage.getItem('access_token'),
  idToken: localStorage.getItem('id_token'),
  expiresAt: localStorage.getItem('expires_at'),
  profile: JSON.parse(localStorage.profile),
  userId: auth.getUserId()
}

const getters = {
  authenticated (state) {
    return state.authenticated
  }
}

const mutations = {
  setSession(state, authData, profile) {
    if (JSON.stringigy(profile).length > 2)
      state.profile = profile

    state.authenticated = true
    state.accessToken = authData.accessToken
    state.idToken = authData.idToken
    state.expiresAt = authData.expiresIn * 1000 + new Date().getTime()

    // localStorage.setItem('access_token', state.accessToken)
    // localStorage.setItem('id_token', state.idToken)
    // localStorage.setItem('expires_at', state.expiresAt)
  },
  logout(state) {
    state.authenticated = false
    state.accessToken = null
    state.idToken = false

    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  },
  setAuthMessage(state, message) {
    state.authMessage = message
  },
}

const actions = {
  login() {
    auth.login()
  },
  logout({ commit }) {
    commit('logout')
  },
  handleAuthentication({ commit }) {
    return new Promise((resolve, reject) => {
      auth.handleAuthentication().then((result, profile) => {
        commit('setSession', result, profile)
        resolve()
      }).catch(err => {
        console.log('Session login failed: ', err)
        return reject(err)
      })
    })
  },
  setAuthMessage({ commit }, message) {
    commit('setAuthMessage', message)
  },
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
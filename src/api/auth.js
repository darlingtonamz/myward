// import { firebase } from './firebase'
import auth0 from 'auth0-js'

// const googleLogin = () => {
//   const provider = new firebase.auth.GoogleAuthProvider()
//   return this.oAuthLogin(provider)
// }

// const oAuthLogin = (provider) => {
//   return 
// }

const _auth0 = new auth0.WebAuth({
  domain: 'amanze.auth0.com',
  clientID: 'DPe3PlgYRPKE7n4tlZLp8hH9XbHDkES9',
  redirectUri: 'http://localhost:8080/callback',
  audience: '',
  responseType: 'token id_token',
  scope: 'openid'
})

const login = () => {
  _auth0.authorize()
}

const handleAuthentication = () => {
  return new Promise((resolve, reject) => {
    _auth0.parseHash((err, authResult) => {
      if (err) return reject(err)
      resolve(authResult)
    })
  })
}

const renewSession = () => {
  return new Promise((resolve, reject) => {
    _auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        resolve(authResult)
      } else if (err) {
        return reject(err)
      }
    })

  })
}

export default { login, handleAuthentication, renewSession }
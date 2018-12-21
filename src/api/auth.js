// import { firebase } from './firebase'
// import auth0 from 'auth0-js'

import auth0FirebaseAuth from './auth0FirebaseAuth'
// const firebaseAuth = new FirebaseAuth()

// const googleLogin = () => {
//   const provider = new firebase.auth.GoogleAuthProvider()
//   return this.oAuthLogin(provider)
// }

// const oAuthLogin = (provider) => {
//   return 
// }

const login = () => {
  auth0FirebaseAuth.login()
  // _auth0.authorize()
}

const handleAuthentication = () => {
  return auth0FirebaseAuth.handleAuthentication()
  // return new Promise((resolve, reject) => {
  //   _auth0.parseHash((err, authResult) => {
  //     if (err) return reject(err)

  //     const profile = _getUserInfo(authResult)
  //     resolve(authResult, profile)
  //   })
  // })
}

// const renewSession = () => {
//   return new Promise((resolve, reject) => {
//     _auth0.checkSession({}, (err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         resolve(authResult)
//       } else if (err) {
//         return reject(err)
//       }
//     })

//   })
// }

export default { login, handleAuthentication }
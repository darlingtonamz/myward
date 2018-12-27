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
}

const getUserId = () => {
  return auth0FirebaseAuth.getUserId()
}

export default { login, handleAuthentication, getUserId }
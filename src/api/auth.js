// import { firebase } from './firebase'
import auth0 from 'auth0-js'
import { db } from './firebase'

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
  scope: 'openid profile email'
})

const login = () => {
  _auth0.authorize()
}

const handleAuthentication = () => {
  return new Promise((resolve, reject) => {
    _auth0.parseHash((err, authResult) => {
      if (err) return reject(err)

      const profile = _getUserInfo(authResult)
      resolve(authResult, profile)
    })
  })
}

const _getUserInfo = (authResult) => {
  // Use access token to retrieve user's profile and set session
  _auth0.client.userInfo(authResult.accessToken, (err, profile) => {
    if (profile) {
      _updateUserData(profile)
      _setSession(authResult, profile)
      return profile
    } else if (err) {
      // console.warn(`Error retrieving profile: ${err.error}`);
      return err
    }
  });
}

const _setSession = (authResult, profile) => {
  // this.$store.authenticated = true
  // this.$store.accessToken = authData.accessToken
  // this.$store.idToken = authData.idToken
  // this.$store.expiresAt = authData.expiresIn * 1000 + new Date().getTime()

  localStorage.setItem('profile', profile)

  localStorage.setItem('access_token', authResult.accessToken)
  localStorage.setItem('id_token', authResult.idToken)
  localStorage.setItem('expires_at', authResult.expiresAt)
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

const _updateUserData = (user) => {
  // Sets user data to firestore on login
  console.log('User', user)
	const usersRef = db.collection('users').doc(user.id)
	const data = {
		...user,
		roles: {
			sponsor: true
		}
	}
	return usersRef.set(data, {merge: true})
};

export default { login, handleAuthentication, renewSession }
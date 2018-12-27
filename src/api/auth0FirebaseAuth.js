import { firebase } from './firebase'
import environment from '../../config/env'
import Axios from 'axios'
import auth0 from 'auth0-js'
import { db } from './firebase'
import store from '@/store'

class auth0FirebaseAuth {
  
  constructor() {
    this.fbAuth = firebase.auth()
    // this.accessToken = (() => )()
    // this.firebaseSub = null
    this.loggedInFirebase = false
    this._auth0 = new auth0.WebAuth({
      domain: 'amanze.auth0.com',
      clientID: 'DPe3PlgYRPKE7n4tlZLp8hH9XbHDkES9',
      redirectUri: 'http://localhost:8080/callback',
      audience: '',
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  }


  _getAccessToken() {
    return localStorage.getItem('id_token')
  }

  getUserId() {
    const profile = JSON.parse(localStorage.profile)
    // console.log(profile, profile.sub, localStorage.profile)
    return profile ? profile.sub : null
  }

  login () {
    this._auth0.authorize()
  }

  handleAuthentication () {
    return new Promise((resolve, reject) => {
      this._auth0.parseHash((err, authResult) => {
        if (err) return reject(err)
  
        const profile = this._getUserInfo(authResult)
        resolve(authResult, profile)
      })
    })
  }

  _getUserInfo (authResult) {
    store.dispatch('setAuthMessage', 'Getting User Information')
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        // _updateUserData(profile)
        this._setSession(authResult, profile)
    
        // Get Firebase token
        this._getFirebaseToken()

        return profile
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`)
        return err
      }
    })
  }
  
  _setSession (authResult, profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
  
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', authResult.expiresAt)
  }

  _getFirebaseToken() {
    // Prompt for login if no access token
    if (!this._getAccessToken()) {
      this.login()
    }
    
    console.log('AcsTkn', this._getAccessToken(), environment)
    Axios
      .get(`${environment.apiRoot}auth/firebase`, {
        headers: {
          Authorization: `Bearer ${this._getAccessToken()}`
        }
      })
      .then((result) => {
        console.log('FIreSub result', result)
        return this._firebaseAuth(result.data)
      }).catch((err) => {
        console.error(`An error occurred fetching Firebase token: ${err.message}`)
      })

  }

  _firebaseAuth(tokenObj) {
    // const self = this
    this.fbAuth.signInWithCustomToken(tokenObj.firebaseToken)
      .then(res => {
        // this.loggedInFirebase = true
        // Schedule token renewal
        this._updateUserData ()
        this.scheduleFirebaseRenewal()
        console.log('Successfully authenticated with Firebase!', res)
      })
      .catch(err => {
        const errorCode = err.code
        const errorMessage = err.message
        console.error(`${errorCode} Could not log into Firebase: ${errorMessage}`)
        this.loggedInFirebase = false
      })
  }

  _updateUserData () {
    // Sets user data to firestore on login
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log('Updating User data on FiB', user)

    const usersRef = db.collection('users').doc(user.sub)
    const data = {
      ...user,
      roles: {
        sponsor: true
      }
    }
    return usersRef.set(data, {merge: true})
  }

  scheduleFirebaseRenewal() {
    /*
    // If user isn't authenticated, check for Firebase subscription
    // and unsubscribe, then return (don't schedule renewal)
    if (!this.loggedInFirebase) {
      if (this.firebaseSub) {
        this.firebaseSub.unsubscribe()
      }
      return
    }
    // Unsubscribe from previous expiration observable
    this.unscheduleFirebaseRenewal()
    // Create and subscribe to expiration observable
    // Custom Firebase tokens minted by Firebase
    // expire after 3600 seconds (1 hour)
    const expiresAt = new Date().getTime() + (3600 * 1000)
    const expiresIn$ = Observable.of(expiresAt)
      .pipe(
        mergeMap(
          expires => {
            const now = Date.now()
            // Use timer to track delay until expiration
            // to run the refresh at the proper time
            return Observable.timer(Math.max(1, expires - now))
          }
        )
      )

    this.refreshFirebaseSub = expiresIn$
      .subscribe(
        () => {
          console.log('Firebase token expired fetching a new one')
          this._getFirebaseToken()
        }
      )
    */
  }

  unscheduleFirebaseRenewal() {
    if (this.refreshFirebaseSub) {
      this.refreshFirebaseSub.unsubscribe()
    }
  }
}

const instance = new auth0FirebaseAuth()
Object.freeze(instance)

export default instance
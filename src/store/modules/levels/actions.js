import { firebaseAction } from 'vuexfire'
import { db } from '@/api/firebase'
import defaultCRUD from '@/api/defaultCRUD'

const actions = {
  delete({ commit }, id) {
    // -> dispatch('levels/delete')
    // commit('delete', id)
  },
  init: firebaseAction(({ bindFirebaseRef }, _) => {
    bindFirebaseRef('levels', db.collection('levels'))
      .where('user_id', '==', userId)
  }),
  initLevels: firebaseAction(({ bindFirebaseRef }, userId) => {
    const loggedInUser = state.session
    bindFirebaseRef('levels', db.collection('levels')
      .where('user_id', '==', userId))      
  }),
  ...defaultCRUD("levels"),
  index: firebaseAction(({ bindFirebaseRef, rootState }, schoolId) => {
    const userId = rootState.session.userId
    const ref = db.collection('levels')
      .where('user_id', '==', userId)
      .where('school_id', '==', schoolId)
    bindFirebaseRef('collection', ref)      
  }),
  create: ({rootState}, data) => {
    const ref = db.collection('levels').doc()
    const userId = rootState.session.userId
    if (data['school_id']) {
      return ref.set({
        id: ref.id,
        user_id: userId,
        ...data
      })
    } else {
      console.log('School ID is required')
    }
  },  
}

export default actions
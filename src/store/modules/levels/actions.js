import { firebaseAction } from 'vuexfire'
import { db } from '@/api/firebase'

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
    bindFirebaseRef('levels', db.collection('levels'))
      .where('user_id', '==', userId)
  }),
}

export default actions
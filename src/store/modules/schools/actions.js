import { db } from '@/api/firebase'
import { firebaseAction } from 'vuexfire'

const actions = {
  index: firebaseAction(({ bindFirebaseRef, rootState }) => {
    const userId = rootState.session.userId
    // console.log('UserId', userId)
    const ref = db.collection('schools')
      .where('user_id', '==', userId)
    bindFirebaseRef('collection', ref)      
  }),
  show({ commit }, id){
    const ref = db.collection('schools').doc(id)
    bindFirebaseRef('currentSchool', ref)
  },
  create({rootState}, data){
    const ref = db.collection('schools').doc()
    const userId = rootState.session.userId
    return ref.set({
      id: ref.id,
      user_id: userId,
      ...data
    })
  },
  update({}, id, data){
    const ref = db.collection('schools').doc(id)
    return ref.set(data, {merge: true})
  },
  delete({ }, id) {
    // -> dispatch('schools/delete')
    const ref = db.collection('schools').doc(id)
    return ref.delete()
  },
}

export default actions
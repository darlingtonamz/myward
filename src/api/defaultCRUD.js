import { db } from '@/api/firebase'
import { firebaseAction } from 'vuexfire'

const defaultCRUD = (model, config) => {
  return {
    index: firebaseAction(({ bindFirebaseRef, rootState }) => {
      // console.log('Unchanged')
      const userId = rootState.session.userId
      const ref = db.collection(model)
        .where('user_id', '==', userId)
      bindFirebaseRef('collection', ref)      
    }),
    show: firebaseAction(({ bindFirebaseRef }, id) => {
      const ref = db.collection(model).doc(id)
      bindFirebaseRef('current', ref)
    }),
    create({rootState}, data){
      const ref = db.collection(model).doc()
      const userId = rootState.session.userId
      return ref.set({
        id: ref.id,
        user_id: userId,
        ...data
      })
    },
    update({}, id, data){
      const ref = db.collection(model).doc(id)
      return ref.set(data, {merge: true})
    },
    delete({ }, id) {
      const ref = db.collection(model).doc(id)
      return ref.delete()
    },
    setCurrent({commit}, data){
      commit('setCurrent', data)
    },
  }
}

export default defaultCRUD
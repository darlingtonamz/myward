import { db } from '@/api/firebase'
import { firebaseAction } from 'vuexfire'
import defaultCRUD from '@/api/defaultCRUD'

const actions = {
  ...defaultCRUD("schools"),
  index: firebaseAction(({ bindFirebaseRef, rootState }) => {
    // console.log('UserId Changed', userId)
    const userId = rootState.session.userId
    const ref = db.collection('schools')
      .where('user_id', '==', userId)
    bindFirebaseRef('collection', ref)
      .then(res => console.log('Res: ', res))     
  }),
  // show({ commit }, id){
  //   const ref = db.collection('schools').doc(id)
  //   bindFirebaseRef('currentSchool', ref)
  // },
  // create({rootState}, data){
  //   const ref = db.collection('schools').doc()
  //   const userId = rootState.session.userId
  //   return ref.set({
  //     id: ref.id,
  //     user_id: userId,
  //     ...data
  //   })
  // },
  // update({}, id, data){
  //   const ref = db.collection('schools').doc(id)
  //   return ref.set(data, {merge: true})
  // },
  // delete({ }, id) {
  //   // -> dispatch('schools/delete')
  //   const ref = db.collection('schools').doc(id)
  //   return ref.delete()
  // },
}

export default actions
import defaultCRUD from '@/api/defaultCRUD'

const actions = {
  ...defaultCRUD("wards"),
  // delete({ commit }, id) {
  //   // -> dispatch('students/delete')
  //   // commit('delete', id)
  // },
}

export default actions
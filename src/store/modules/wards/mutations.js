const mutations = {
  delete(state, id) {
    // -> commit('students/delete', id)
  },
  setCurrent(state, data) {
    state.current = data
  }
}

export default mutations
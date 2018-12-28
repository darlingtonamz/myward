const mutations = {
  delete(state, id) {
    // -> commit('schools/delete', id)
  },
  setCurrent(state, data) {
    state.current = data
  }
}

export default mutations
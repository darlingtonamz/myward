const mutations = {
  delete(state, id) {
    // -> commit('levels/delete', id)
  },
  setCurrent(state, data) {
    state.current = data
  }
}

export default mutations
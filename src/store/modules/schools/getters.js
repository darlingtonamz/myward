const getters = {
  get (state) {
    // -> getters['schools/get']
  },
  schools (state) {
    // -> getters['schools/schools']
    return state.collection
  },
  current (state) {
    // -> getters['schools/current']
    return state.current
  }
}

export default getters
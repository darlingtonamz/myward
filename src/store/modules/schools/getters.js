const getters = {
  get (state) {
    // -> getters['schools/get']
  },
  schools (state) {
    // -> getters['schools/get']
    return state.collection
  }
}

export default getters
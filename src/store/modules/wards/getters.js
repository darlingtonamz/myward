const getters = {
  get (state) {
    // -> getters['students/get']
  },
  wards (state) {
    // -> getters['schools/get']
    return state.collection
  }
}

export default getters
const getters = {
  get (state) {
    // -> getters['levels/get']
  },
  collection: (state) => state.collection,
  levels (state) {
    // -> getters['levels/levels']
    return state.collection
  },
  current (state) {
    // -> getters['levels/current']
    return state.current
  },
}

export default getters
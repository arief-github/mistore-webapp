export const state = () => ({
  sliders: [],
  page: 1
});

export const mutations = {
  SET_SLIDERS_DATA(state, payload) {
    state.sliders = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  }
}

export const actions = {
  getSlidersData({ commit, state }, payload) {
    let search = payload ? payload : '';

    return new Promise((resolve, reject) => {
      // fetching from rest API "api/admin/sliders" with method GET
      this.$axios.get(`api/admin/sliders?q=${search}&page=${state.page}`)
        .then(response => {
          commit("SET_SLIDERS_DATA", response.data.data);

          resolve();
        })
    })
  },
  storeSlider({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      // store to rest API "api/admin/user" with method POST
      this.$axios.post('api/admin/sliders', payload)
        .then(() => {
          dispatch("getSlidersData");

          resolve()
        })
        .catch((error) => {
          reject(error)
        });
    })
  },
  destroySlider({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      // store to api "api/admin/sliders/:id" with method DELETE
      this.$axios.delete('api/admin/users', payload)
        .then(() => {
          dispatch("getSlidersData");

          resolve()
        })
    })
  }
}

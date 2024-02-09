export const state = () => ({
  users: [],
  user: {},
  page: 1
});

export const mutations = {
  SET_USERS_DATA(state, payload) {
    // set value state users
    state.users = payload;
  },
  SET_USER_DATA(state, payload) {
    // set value state user
    state.user = payload;
  },
  SET_PAGE(state, payload) {
    // set value state page
    state.page = payload;
  }
}

export const actions = {
  // get users data
  getUsersData({ commit, state }, payload) {
    let search = payload ? payload : '';

    return new Promise((resolve, reject) => {
      // fetching rest api "api/admin/users" with method GET
      this.$axios.get(`api/admin/users?q=${search}&page=${state.page}`)
        .then((response) => {
          // commit set users data
          commit('SET_USERS_DATA', response.data.data)

          resolve()
        })
    })
  },
  storeUser({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      // store to rest api "api/admin/users" with method POST
      this.$axios.post(`api/admin/users`, payload)
        .then((response) => {
          // dispath to action getUsersData
          dispatch("getUsersData");

          resolve()
        })
        .catch(error => {
          reject(error)
        });
    })
  },
  getDetailUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`api/admin/users/${payload}`)
        .then((response) => {
          commit("SET_USER_DATA", response.data.data);

          resolve();
        })
    })
  },
  updateUser({ dispatch, commit }, { payload, userId }) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`api/admin/users/${userId}`, payload)
        .then(() => {
          dispatch("getUsersData");

          resolve();
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroyUser({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.delete(`api/admin/users/${payload}`)
        .then(() => {
          dispatch("getUsersData");

          resolve()
        })
    })
  }
}

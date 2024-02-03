export const state = () => ({
  categories: [],
  page: 1,
  category: {}
});

export const mutations = {
  SET_CATEGORIES_DATA(state, payload) {
    state.categories = payload;
  }
}

export const actions = {
  // get all categories data
  getCategoriesData({ commit, state }, payload) {
    // search
    let search = payload ? payload : '';

    return new Promise((resolve, reject) => {
      // fetching data from "api/admin/categories" with method GET
      this.$axios.get(`api/admin/categories?q=${search}&page=${state.page}`)
        .then((response) => {
          // commit the mutation "SET_CATEGORIES_DATA"
          commit("SET_CATEGORIES_DATA", response.data.data);

          resolve()
        })
        .catch((error) => {
          reject(error)
        });
    })
  },
  getListAllCategories({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      // fetching REST API "api/web/categories" with method "GET"
      this.$axios.get('api/web/categories')
        .then((response) => {
          // commit the mutation SET_CATEGORIES_DATA
          commit('SET_CATEGORIES_DATA', response.data.data);

          resolve()
        })
        .catch(error => {
          reject(error);
        });
    })
  }
}

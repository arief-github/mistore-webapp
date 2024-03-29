export const state = () => ({
  categories: [],
  page: 1,
  category: {}
});

export const mutations = {
  SET_CATEGORIES_DATA(state, payload) {
    state.categories = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  SET_CATEGORY_DATA(state, payload) {
    state.category = payload;
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
  },
  getDetailCategory({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // get detail product from rest api "api/admin/categoried/:id" with method GET
      this.$axios.get(`api/admin/categories/${payload}`)
        .then(response => {
          commit('SET_CATEGORY_DATA', response.data.data);

          resolve();
        })
    })
  },
  storeCategory({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      // store to rest api "api/admin/categories" with method POST
      this.$axios.post('api/admin/categories', payload)
        .then(() => {
          // dispatch action getCategoriesData
          dispatch("getCategoriesData");

          resolve()
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  updateCategory({ dispatch, commit }, { categoryId, payload }) {
    return new Promise((resolve, reject) => {

      // store to rest api "api/admin/categories/:id"
      this.$axios.post(`api/admin/categories/${categoryId}`, payload)
        .then(response => {
          // dispatch action getCategoriesData
          dispatch('getCategoriesData');

          resolve();
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroyCategory({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      // delete action from rest api "api/admin/category/:id"
      this.$axios.delete(`api/admin/categories/${payload}`)
        .then(() => {
          dispatch("getCategoriesData");

          resolve()
        })
    })
  }
}

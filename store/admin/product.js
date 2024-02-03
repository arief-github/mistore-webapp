export const state = () => ({
  products: [],
  page: 1
});

export const mutations = {
  SET_PRODUCTS_DATA(state, payload) {
    state.products  = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  }
}

export const actions = {
  getProductsData({ commit, state }, payload) {
    let search = payload ? payload : '';

    return new Promise((resolve, reject) => {
      // fetch rest api 'api/admin/products' with method GET
      this.$axios.get(`/api/admin/products?q=${search}&page=${state.page}`)
        .then((response) => {
          // commit the mutation SET_PRODUCTS_DATA
          commit('SET_PRODUCTS_DATA', response.data.data);

          resolve()
        })
    })
  },
  storeProduct({ dispatch, commit }, payload) {
    // set promise
    return new Promise((resolve, reject) => {
      // store to REST API "/api/admin/products" with method POST
      this.$axios.post('/api/admin/products', payload)
        .then(() => {
          // dispatch action "getProductsData"
          dispatch("getProductsData");

          // resolve promise
          resolve()
        })
        .catch((error) => {
          reject(error);
        });

    })
  }
}

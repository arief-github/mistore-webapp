export const state = () => ({
  products: [],
  product: {},
  page: 1
});

export const mutations = {
  SET_PRODUCTS_DATA(state, payload) {
    state.products = payload;
  },
  SET_PRODUCT_DATA(state, payload) {
    state.product = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  }
}

export const actions = {
  // get products data
  getProductsData({ commit, state }, payload) {
    // search
    let search = payload ? payload : '';

    return new Promise((resolve, reject) => {
      // fetching rest api "api/web/products" with method get
      this.$axios.get(`api/web/products?q=${search}&page=${state.page}`)
        .then(response => {
          commit('SET_PRODUCTS_DATA', response.data.data);

          resolve();
        })
    });
  },
  getDetailProduct({commit}, payload) {
    return new Promise((resolve, reject) => {
      // calling rest api "api/web/products/:slug" with method GET
      this.$axios.get(`api/web/products/${payload}`)
        .then(response => {
          // commit to mutation SET_PRODUCT_DATA
          commit("SET_PRODUCT_DATA", response.data.data);

          // resolve promise
          resolve()
        })
    })
  }
}

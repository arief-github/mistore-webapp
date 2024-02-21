export const state = () => ({
  products: [],
  page: 1
});

export const mutations = {
  SET_PRODUCTS_DATA(state, payload) {
    state.products = payload;
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
  }
}

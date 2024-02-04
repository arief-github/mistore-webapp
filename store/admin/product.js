export const state = () => ({
  products: [],
  page: 1,
  product: {},
});

export const mutations = {
  SET_PRODUCTS_DATA(state, payload) {
    state.products  = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  SET_PRODUCT_DATA(state, payload) {
    state.product =  payload;
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
  },
  getDetailProduct({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // get detail product for rest api "api/admin/products/:id" with method GET
      this.$axios.get(`api/admin/products/${payload}`)
        .then((response) => {
          // commit to mutation "SET_PRODUCT_DATA"
          commit('SET_PRODUCT_DATA', response.data.data)

          resolve()
        })
    })
  },
  updateProduct({ dispatch, commit }, { productId, payload }) {
    return new Promise((resolve, reject) => {
      // store to rest API "/api/admin/products/:id" with method POST
      this.$axios.post(`api/admin/products/${productId}`, payload)
        .then(response => {
          // dispatch action "getProductData"
          dispatch("getProductsData");

          resolve();
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroyProduct({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      // delete to REST API "api/admin/products/:id with method DELETE
      this.$axios.delete(`api/admin/products/${payload}`)
        .then(() => {
          // dispatch action getProductsData
          dispatch('getProductsData');

          resolve();
        })
    })
  }
}

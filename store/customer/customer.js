export const actions = {
  storeRegister({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // store to rest API "/api/customer/register" with method POST
      this.$axios.post('/api/customer/register', payload)
        .then(() => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
};

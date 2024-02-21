export const state = () => ({
  sliders: [],
});

export const mutations = {
  SET_SLIDERS_DATA(state, payload) {
    state.sliders = payload;
  }
}

export const actions = {
  getSlidersData({commit}) {
    return new Promise((resolve, reject) => {
      // fetching rest api "api/web/sliders" with method get
      this.$axios.get('api/web/sliders')
        .then((response) => {
          commit("SET_SLIDERS_DATA", response.data.data);

          resolve()
        })
    });
  }
}

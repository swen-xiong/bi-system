import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import presistedstate from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setToken(state: any, token: string): void {
      state.token = token;
    },

    clearToken(state: any): void {
      state.token = null;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    presistedstate({storage: window.sessionStorage})
  ]
});

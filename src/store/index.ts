import Vue from 'vue'
import Vuex from 'vuex'
import presistedstate from 'vuex-persistedstate'
import { ICubeState } from './modules/cube'
import { IUserState } from './modules/user'
import { ISheetState } from './modules/sheet'

Vue.use(Vuex);

export interface IRootState {
  cube: ICubeState,
  user: IUserState,
  sheet: ISheetState
}

export default new Vuex.Store<IRootState>({
  // state: {
  //   token: ''
  // },
  // mutations: {
  //   setToken(state: any, token: string): void {
  //     state.token = token;
  //   },

  //   clearToken(state: any): void {
  //     state.token = null;
  //   }
  // },
  // actions: {
  // },
  // modules: {
  //   cube: CubeModule,
  //   user: UserModule
  // },
  plugins: [
    presistedstate({storage: window.sessionStorage})
  ]
});

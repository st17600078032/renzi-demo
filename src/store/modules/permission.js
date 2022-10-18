import { constantRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    setRouters(state, payload) {
      state.routes = [...constantRoutes, ...payload]
    }
  }
}

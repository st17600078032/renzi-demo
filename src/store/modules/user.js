import { login } from '@/api/login'

export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const { data: { data }} = await login(loginData)
      console.log(data)
      commit('setToken', data)
    }
  }
}

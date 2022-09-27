import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    TimeRanges: 0
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    removeToken(state) {
      state.token = null
    },
    setTimeRanges(state, TimeRanges) {
      state.TimeRanges = TimeRanges
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      commit('setToken', data)
      commit('setTimeRanges', new Date().getTime())
    },
    async getUserInfo({ commit }) {
      // 接口
      const res = await getUserInfo()
      const res1 = await getUserDetailById(res.userId)
      const result = { ...res, ...res1 }
      commit('setUserInfo', result)
      return JSON.parse(JSON.stringify(result))
    },
    logout({ commit }) {
      commit('removeUserInfo')
      commit('removeToken')
    }
  }
}

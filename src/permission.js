import router from './router'
import store from '@/store'

const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  // 判断token是否存在
  // 存在 登录状态
  if (store.getters.token) {
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    // 判断是否去登录页面
    if (to.path === '/login') {
      // 留在首页
      next('/')
    } else {
      // 允许去往首页
      next()
    }
  } else {
    // 不存在 未登录状态
    // 如果在白名单内
    if (whiteList.includes(to.path)) {
      // 放行
      next()
    } else {
      // 否则留在登录页面
      next('/login')
    }
  }
})

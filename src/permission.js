import router from './router'
import store from '@/store'
import { asyncRoutes } from '@/router/index'

const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  // 判断token是否存在
  // 存在 登录状态
  if (store.getters.token) {
    if (!store.getters.userId) {
      const roles = await store.dispatch('user/getUserInfo')
      console.log(roles)
      const filterRouters = asyncRoutes.filter(item => {
        return roles.menus.includes(item.meat.id)
      })

      router.addRoutes([...filterRouters, { path: '*', redirect: '/404', hidden: true }])
      store.commit('permission/setRouters', filterRouters)
      next(to.path)
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

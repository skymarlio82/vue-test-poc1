import { asyncRouterMap, constantRouterMap } from '@/router/index'

function hasPermission (menus, route) {
  if (route.menu) {
    return menus.indexOf(route.menu) > -1
  } else {
    return true
  }
}

function filterAsyncRouter (asyncRouterMap, menus) {
  return asyncRouterMap.filter(route => {
    if (hasPermission(menus, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menus)
        return (route.children && route.children.length)
      }
      return true
    }
    if (route.path === '*') {
      return true
    }
    return false
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, userData) {
      return new Promise((resolve) => {
        const roles = userData.authorities
        console.log('userRole: ', roles)
        let accessedRouters
        if (roles.includes('ROLE_ADMIN')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission

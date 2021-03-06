import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/P404'),
    hidden: true
  },
  {
    path: '/oauth2Token',
    component: () => import('@/views/POauth2Token'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/layout/Layout'),
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: true,
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/Dashboard')
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/user',
    component: () => import('@/views/layout/Layout'),
    redirect: 'noredirect',
    name: '用户权限',
    hidden: false,
    meta: { title: '用户权限', icon: 'icon-infopersonal' },
    children: [
      {
        path: 'list',
        name: '用户列表',
        hidden: false,
        component: () => import('@/views/user/UserList'),
        meta: { title: '用户列表', icon: 'icon-groupctrl' },
        menu: 'ROLE_ADMIN'
      },
      {
        path: 'role',
        name: '权限管理',
        hidden: false,
        component: () => import('@/views/P404'),
        meta: { title: '权限管理', icon: 'icon-safety' },
        menu: 'ROLE_ADMIN'
      }
    ]
  },
  {
    path: '/account',
    component: () => import('@/views/layout/Layout'),
    redirect: 'noredirect',
    name: '账户配置',
    hidden: false,
    meta: { title: '账户配置', icon: 'icon-nickname' },
    children: [
      {
        path: 'profile',
        name: '账户信息',
        hidden: false,
        component: () => import('@/views/P404'),
        meta: { title: '账户信息', icon: 'icon-addresslist' },
        menu: 'ROLE_USER'
      },
      {
        path: 'config',
        name: '配置信息',
        hidden: false,
        component: () => import('@/views/P404'),
        meta: { title: '配置信息', icon: 'icon-menu' },
        menu: 'ROLE_USER'
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

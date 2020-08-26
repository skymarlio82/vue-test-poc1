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
    path: '/',
    component: () => import('@/views/layout/Layout'),
    redirect: '/dashboard',
    name: '首页',
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
    redirect: '/user/',
    name: '用户权限',
    hidden: false,
    meta: { title: '用户权限', icon: 'table' },
    children: [
      {
        path: '',
        name: '用户列表',
        hidden: false,
        component: () => import('@/views/user/UserList'),
        meta: { title: '用户列表', icon: 'user' },
        menu: 'user'
      },
      {
        path: 'role',
        name: '权限管理',
        hidden: false,
        component: () => import('@/views/P404'),
        meta: { title: '权限管理', icon: 'password' },
        menu: 'role'
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

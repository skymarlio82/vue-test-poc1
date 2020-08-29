import { removeLoginStatus, setLoginStatus, removeTokenKey, setTokenKey } from '@/utils/auth'
// eslint-disable-next-line import/no-named-default
import { default as api } from '@/utils/api'
import store from '@/store'
import router from '@/router'

const user = {
  state: {
    userId: '',
    userName: '',
    roleName: '',
    token: '',
    avatar: 'https://pic-oss.oss-cn-beijing.aliyuncs.com/test_imgs/jojo_icon.png',
    allUsers: []
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userId = userInfo.userId
      state.userName = userInfo.userName
      state.roleName = userInfo.roleName
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    RESET_USER: (state) => {
      state.userId = ''
      state.userName = ''
      state.roleName = ''
      state.token = ''
    },
    SET_ALL_USERS: (state, allUsers) => {
      state.allUsers = allUsers
    }
  },
  actions: {
    Login ({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        api({
          url: 'auth',
          method: 'post',
          data: loginForm
        }).then((data) => {
          if (data.token) {
            setLoginStatus()
            setTokenKey(data.token)
          }
          commit('SET_TOKEN', data.token)
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        api({
          url: 'getInfo',
          method: 'get'
        }).then((data) => {
          commit('SET_USER', data)
          store.dispatch('GenerateRoutes', data).then(() => {
            router.addRoutes(store.getters.addRouters)
          })
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetAllUsers ({ commit }) {
      return new Promise((resolve, reject) => {
        api({
          url: 'getAllUsers',
          method: 'get'
        }).then((data) => {
          commit('SET_ALL_USERS', data)
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    LogOut () {
      return new Promise((resolve) => {
        store.dispatch('FedLogOut').then(() => {
          resolve()
        })
      })
    },
    FedLogOut ({ commit }) {
      return new Promise((resolve) => {
        commit('RESET_USER')
        removeLoginStatus()
        removeTokenKey()
        resolve()
      })
    }
  }
}

export default user

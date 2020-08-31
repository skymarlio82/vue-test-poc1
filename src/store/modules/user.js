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
    avatar: 'https://pic-oss.oss-cn-beijing.aliyuncs.com/test_imgs/jojo_icon.png'
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userId = userInfo.id
      state.userName = userInfo.username
      state.roleName = userInfo.authorities[0]
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    RESET_USER: (state) => {
      state.userId = ''
      state.userName = ''
      state.roleName = ''
      state.token = ''
    }
  },
  actions: {
    Login ({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        api({
          url: 'login/native',
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
    SetOauth2Token ({ commit }, oauth2Token) {
      return new Promise((resolve) => {
        setLoginStatus()
        setTokenKey(oauth2Token)
        commit('SET_TOKEN', oauth2Token)
        resolve(oauth2Token)
      })
    },
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        api({
          url: 'api/user/me',
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

// eslint-disable-next-line import/no-named-default
import { default as api } from '@/utils/api'

const test = {
  state: {
    allUsers: [],
    chartData: {},
    chartData1: {}
  },
  mutations: {
    SET_ALL_USERS: (state, allUsers) => {
      state.allUsers = allUsers
    },
    SET_CHART_DATA: (state, chartData) => {
      state.chartData = chartData
    },
    SET_CHART_DATA_1: (state, chartData1) => {
      state.chartData1 = chartData1
    }
  },
  actions: {
    GetAllUsers ({ commit }) {
      return new Promise((resolve, reject) => {
        api({
          url: 'api/test/getAllUsers',
          method: 'get'
        }).then((data) => {
          commit('SET_ALL_USERS', data)
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetChartData ({ commit }) {
      return new Promise((resolve, reject) => {
        api({
          url: 'api/test/chartData',
          method: 'get'
        }).then((data) => {
          commit('SET_CHART_DATA', data)
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetChartData1 ({ commit }) {
      return new Promise((resolve, reject) => {
        api({
          url: 'api/test/chartData1',
          method: 'get'
        }).then((data) => {
          commit('SET_CHART_DATA_1', data)
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}

export default test

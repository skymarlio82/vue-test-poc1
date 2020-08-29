// eslint-disable-next-line import/no-named-default
import { default as api } from '@/utils/api'

const test = {
  state: {
    chartData: {},
    chartData1: {}
  },
  mutations: {
    SET_CHART_DATA: (state, chartData) => {
      state.chartData = chartData
    },
    SET_CHART_DATA_1: (state, chartData1) => {
      state.chartData1 = chartData1
    }
  },
  actions: {
    GetChartData ({ commit }) {
      return new Promise((resolve, reject) => {
        api({
          url: 'protected/chartData',
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
          url: 'protected/chartData1',
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

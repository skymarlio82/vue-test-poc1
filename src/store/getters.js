const getters = {

  sidebar: state => state.app.sidebar,

  userId: state => state.user.userId,
  userName: state => state.user.userName,
  roleName: state => state.user.roleName,
  token: state => state.user.token,
  avatar: state => state.user.avatar,

  permissionRouters: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  allUsers: state => state.user.allUsers,

  chartData: state => state.test.chartData,
  chartData1: state => state.test.chartData1
}

export default getters

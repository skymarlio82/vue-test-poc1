<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :lg="6" :md="12" :sm="24">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span><b>线状图表</b></span>
            <el-button style="float:right;padding:3px 0" type="text">查看细节</el-button>
          </div>
          <ve-line :data="chartData"></ve-line>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span><b>柱状图表</b></span>
            <el-button style="float:right;padding:3px 0" type="text">查看细节</el-button>
          </div>
          <ve-histogram :data="chartData"></ve-histogram>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span><b>饼状图表</b></span>
            <el-button style="float:right;padding:3px 0" type="text">查看细节</el-button>
          </div>
          <ve-pie :data="chartData"></ve-pie>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span><b>地理图表</b></span>
            <el-button style="float:right;padding:3px 0" type="text">查看细节</el-button>
          </div>
          <ve-map :data="chartData1"></ve-map>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span><b>用户信息列表</b></span>
          </div>
          <el-table :data="userList" ref="singleTable"
                    height="450px" border size="mini" fit
                    highlight-current-row
                    v-loading.body="listLoading" element-loading-text="Loading now ..."
                    style="width: 100%" stripe
                    @current-change="handleCurrentSelected">
            <el-table-column prop="userId" label="Id">
            </el-table-column>
            <el-table-column label="User Details">
              <el-table-column prop="userName" label="Name">
              </el-table-column>
              <el-table-column label="Enabled">
                <template slot-scope="scope">
                  <i v-if="scope.row.enabled===true" class="el-icon-check"></i>
                  <i v-else class="el-icon-close"></i>
                </template>
              </el-table-column>
              <el-table-column prop="lastPasswordResetDate" label="Last password reset date"
                               :formatter="dateFormat">
              </el-table-column>
              <el-table-column label="Role">
                <template slot-scope="scope">
                  <el-tag type="success" size="small" v-if="scope.row.roleName==='ROLE_ADMIN'">ROLE_ADMIN</el-tag>
                  <el-tag type="warning" size="small" v-else-if="scope.row.roleName==='ROLE_USER'">ROLE_USER</el-tag>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="Actions" v-if="hasPerm(['ROLE_ADMIN'])">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="showUpdate(scope.$index)">Edit</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="listQuery.pageNum" :page-size="listQuery.pageRow" :total="totalCount"
                         :page-sizes="[10, 20, 100]" layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="Updating User Info:" :visible.sync="dialogFormVisible">
      <el-form :model="tempUser" class="small-space"
        label-position="left" label-width="90px"
        style="width:300px;margin-left:50px;">
        <el-form-item label="Id">
          <el-input type="text" v-model="tempUser.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input type="text" v-model="tempUser.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="Password" required>
          <el-input type="password" v-model="tempUser.password"></el-input>
        </el-form-item>
        <el-form-item label="Role">
          <el-select v-model="tempUser.roleName" placeholder="请选择">
            <el-option v-for="item in ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_ANONYMOUS']"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">Cancel</el-button>
        <el-button type="primary" @click="updateUser">Update</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Table, TableColumn, Tag, Button, Pagination, Dialog, Form, FormItem, Input, Row, Col, Select, Option, Card } from 'element-ui'
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'
import VeMap from 'v-charts/lib/map.common'

export default {
  name: 'UserList',
  mounted () {
    this.getAllUsers()
    this.getChartDatas()
  },
  data () {
    return {
      userList: this.$store.getters.allUsers,
      userListOrigin: [],
      listLoading: false,
      currentRow: null,
      totalCount: this.$store.getters.allUsers.length,
      listQuery: {
        pageNum: 1,
        pageRow: 10
      },
      dialogFormVisible: false,
      tempUser: {
        userId: '',
        userName: '',
        password: '',
        enabled: false,
        roleName: ''
      },
      chartData: this.$store.getters.chartData,
      chartData1: this.$store.getters.chartData1
    }
  },
  methods: {
    getAllUsers () {
      this.listLoading = true
      this.$store.dispatch('GetAllUsers').then((data) => {
        this.userList = data
        this.userListOrigin = data
        this.showDisplayedRows()
        this.listLoading = false
      }).catch((error) => {
        console.log(error)
      })
    },
    getChartDatas () {
      this.$store.dispatch('GetChartData').then((data) => {
        this.chartData = data
        console.log('chartData := ', data)
      }).catch((error) => {
        console.log(error)
      })
      this.$store.dispatch('GetChartData1').then((data) => {
        this.chartData1 = data
        console.log('chartData1 := ', data)
      }).catch((error) => {
        console.log(error)
      })
    },
    handleCurrentSelected (val) {
      this.currentRow = val
    },
    dateFormat (row, column) {
      return this.moment(row.lastPasswordResetDate).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSizeChange (val) {
      this.listLoading = true
      this.listQuery.pageRow = val
      this.listQuery.pageNum = 1
      this.showDisplayedRows()
      this.listLoading = false
    },
    handleCurrentChange (val) {
      this.listLoading = true
      this.listQuery.pageNum = val
      this.showDisplayedRows()
      this.listLoading = false
    },
    showUpdate ($index) {
      const user = this.userList[$index]
      this.tempUser.userId = user.userId
      this.tempUser.userName = user.userName
      this.tempUser.enabled = user.enabled
      this.tempUser.roleName = user.roleName
      this.tempUser.password = ''
      this.dialogFormVisible = true
    },
    updateUser () {
      console.log('updating the user data ...')
      this.getAllUsers()
      this.getChartDatas()
      this.dialogFormVisible = false
    },
    showDisplayedRows () {
      this.userList = this.userListOrigin.slice((this.listQuery.pageNum - 1) * this.listQuery.pageRow, this.listQuery.pageNum * this.listQuery.pageRow)
    }
  },
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Pagination.name]: Pagination,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Row.name]: Row,
    [Col.name]: Col,
    [Select.name]: Select,
    [Option.name]: Option,
    [Card.name]: Card,
    [VeLine.name]: VeLine,
    [VeHistogram.name]: VeHistogram,
    [VePie.name]: VePie,
    [VeMap.name]: VeMap
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.row-bg {
  padding: 10px 0;
}

.clearfix:before, .clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  height: 450px;
}
</style>

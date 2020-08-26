<template>
  <div class="login-container">
    <el-form autoComplete="on"
             :model="loginForm"
             :rules="loginRules"
             ref="loginForm"
             label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">AdminLTE 后台系统</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="iconfont icon-nickname" ></i>
        </span>
        <el-input type="text"
                  v-model="loginForm.username"
                  autoComplete="on">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-locking" ></i>
        </span>
        <el-input type="password"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.password"
                  autoComplete="on">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   style="width:100%;"
                   :loading="loading"
                   @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'element-ui'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'test',
        password: 'password'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名称' }],
        password: [{ required: true, trigger: 'blur', message: '请输入用户密码' }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin: function () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((data) => {
            this.loading = false
            if (data.token) {
              this.$router.push({ path: '/' })
            } else {
              this.$message.error('账号/密码错误')
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  },
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Button.name]: Button
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "../styles/mixin.scss";
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  @include relative;
  height: 100vh;
  background-color: $bg;
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 45px;
  }
  .el-input {
    display: inline-block;
    height: 45px;
    width: 85%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    color: $light_gray;
    margin: 20px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 385px;
    padding: 35px 35px 15px 35px;
    margin: 175px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }
  .third-part-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>

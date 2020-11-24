<template>
  <div class="x-login">
    <div class="x-login-box">
      <el-form class="x-login-form" :rules="rules" ref="user" :model="user">
        <div class="x-login-title">
          <span>Sign in</span>
        </div>
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            placeholder="account or email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            type="password"
            placeholder="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="x-login-btn" type="primary" @click="login('user')"
            >Sign in</el-button
          >
        </el-form-item>
        <el-divider class="x-login-social-line"
          >Sign in with other accounts</el-divider
        >
        <!-- <a href="http://localhost:8080/oauth2/authorization/github"></a> -->
      </el-form>
      <div class="x-create-account">
        New to GoChat?
        <router-link to="/signup">Create an account</router-link>.
      </div>
    </div>
  </div>
</template>

<script>
import { login, getUserInfo, register } from '@/api/user'

export default {
  name: 'Home',
  data() {
    return {
      user: {
        username: null,
        password: null,
        sex: 'M',
        avatarUrl: 'asd',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.user).then(res => {
            localStorage.setItem('Authentication', res.data)
          })
        }
      })
    },
    getUserInfo() {
      getUserInfo().then(res => {
        this.$message(res.data)
      })
    },
    register() {
      register(this.user).then(res => {
        console.log(res)
      })
    },
  },
}
</script>
<style lang="less">
.x-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // overflow: hidden;
  .x-login-form {
    width: 260px;
    border-radius: 10px;
    background-color: #f6f8fa;
    border: 1px solid #dbe0e4;
    padding: 25px;
    .x-login-title {
      text-align: center;
      font-size: 20px;
      padding-bottom: 20px;
    }
    .x-login-btn {
      width: 100%;
    }
    .x-login-social-line {
      white-space: nowrap;
    }
  }
  .x-create-account {
    border: 1px solid #d8dee2;
    border-radius: 5px;
    margin-top: 16px;
    margin-bottom: 10px;
    padding: 15px 20px;
    line-height: 1.5;
    text-align: center;
    font-size: 14px;
    color: #24292e;
  }
}
</style>

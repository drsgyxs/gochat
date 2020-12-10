<template>
  <div class="x-login">
    <div class="x-login-box">
      <el-form class="x-login-form" :rules="rules" ref="user" :model="user">
        <div class="x-login-title">
          <span>Sign in</span>
        </div>
        <el-form-item prop="username">
          <el-input
            ref="usernameInput"
            v-model.trim="user.username"
            placeholder="Username or email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="user.password"
            type="password"
            placeholder="Password"
            @keyup.enter.native="login('user')"
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
import { login } from '@/api/user'
import request from '../utils/request'
import { getCookie } from '../utils/cookie'

export default {
  name: 'Home',
  data() {
    return {
      user: {
        username: null,
        password: null,
      },
      rules: {
        username: [
          { required: true, message: 'Username is required', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.user).then(res => {
            console.log(res)
            // localStorage.setItem('Authorization', res.token)
            this.$router.push('/')
          })
        }
      })
    },
    kuwo() {
      request.get('/kuwo').then(() => {
        const csrf = getCookie('kw_token')
        console.log(csrf)
        request({
          url: '/kuwo/api/www/bang/bang/musicList?bangId=16&pn=1&rn=30',
          method: 'GET',
          headers: {
            csrf,
          },
          withCredentials: true,
        }).then(res => {
          console.log(res)
        })
      })
    },
  },
  mounted() {
    this.$refs.usernameInput.focus()
    this.kuwo()
  },
}
</script>
<style lang="less">
.x-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .x-login-form {
    width: 260px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #dbe0e4;
    box-shadow: 0 2px 5px 0 hsl(0, 0%, 80%);
    padding: 25px;
    .x-login-title {
      font-size: 20px;
      font-weight: 600;
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

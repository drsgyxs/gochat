<template>
  <div class="x-signup">
    <div class="x-signup-box">
      <el-form
        class="x-signup-form"
        :rules="rules"
        ref="userForm"
        :model="user"
      >
        <div class="x-signup-title">
          <span>Sign up</span>
        </div>
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            ref="usernameInput"
            placeholder="Username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="user.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            type="password"
            placeholder="Password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="x-signup-btn"
            type="primary"
            @click="signup('userForm')"
            >Sign up</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  data() {
    return {
      user: {
        username: null,
        email: null,
        password: null,
      },
      rules: {
        username: [
          { required: true, message: 'Username is required', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    signp(formName) {
      this.$ref[formName].validate(valid => {
        if (valid) {
          register(this.user).then(res => {
            localStorage.setItem('Authorization', res.token)
            this.$router.push('/')
          })
        }
      })
    },
  },
  mounted() {
    this.$refs.usernameInput.focus()
  },
}
</script>

<style lang="less">
.x-signup {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .x-signup-form {
    width: 350px;
    // border-radius: 10px;
    // border: 1px solid #dbe0e4;
    background-color: #fff;
    padding: 25px;
    border: 5px dotted #dbe0e4;
    box-shadow: 10px 20px 20px -10px hsl(0, 0%, 80%);
    border-top-left-radius: 200px 15px;
    border-top-right-radius: 15px 200px;
    border-bottom-right-radius: 200px 15px;
    border-bottom-left-radius: 15px 200px;
    .x-signup-title {
      padding-bottom: 20px;
      font-size: 20px;
      font-weight: 600;
    }
    .x-signup-btn {
      width: 100%;
    }
  }
}
</style>

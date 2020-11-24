<template>
  <div class="signup">
    <div class="x-signup-box">
      <el-form class="x-signup-form" :rules="rules" ref="user" :model="user">
        <div class="x-signup-title">
          <span>Sign up</span>
        </div>
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="account"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="user.email" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            type="password"
            placeholder="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="x-signup-btn" type="primary">Sign up</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
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
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
}
</script>

<style lang="less">
.x-signup-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

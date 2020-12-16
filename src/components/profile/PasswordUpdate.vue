<template>
  <div class="password-update">
    <div class="profile-title">
      <span class="profile-title-icon"></span>
      <span class="profile-title-text">
        {{ title }}
      </span>
    </div>
    <div class="user-setting-wrap">
      <el-form
        ref="userForm"
        :model="user"
        hide-required-asterisk
        :rules="rules"
      >
        <el-form-item prop="password" label="原密码">
          <el-input
            type="password"
            v-model.trim="user.password"
            placeholder="原密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input
            type="password"
            v-model.trim="user.newPassword"
            placeholder="新密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPassword" label="确认密码">
          <el-input
            type="password"
            v-model.trim="user.checkPassword"
            placeholder="确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="padding-dom"></div>
          <div class="user-my-btn-wrap">
            <el-button
              class="my-btn"
              type="primary"
              @click="updatePass('userForm')"
              >保存</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveUser, getUserInfo } from '../../api/user'

export default {
  props: ['title'],
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else {
        if (!/[A-Za-z0-9._~!@#$^&*]+$/.test(value)) {
          callback(new Error('密码只能包含字母数字和._~!@#$^&*'))
        } else if (
          !/(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9._~!@#$^&*]+$/.test(value)
        ) {
          callback(new Error('密码必须同时包含字母和数字'))
        } else if (
          !/(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9._~!@#$^&*]{8,18}$/.test(value)
        ) {
          callback(new Error('密码长度为8-18位'))
        } else {
          if (this.user.checkPassword !== '') {
            this.$refs.userForm.validateField('checkPassword')
          }
          callback()
        }
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: {
        userId: null,
        password: null,
        newPassword: null,
        checkPassword: null,
      },
      passPattern: /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9._~!@#$^&*]{8,18}$/,
      rules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
        ],
        newPassword: [{ validator: validatePass, trigger: 'blur' }],
        checkPassword: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  methods: {
    updatePass() {
      saveUser(this.user).then(() => {
        this.$message.success('保存成功')
      })
    },
    getInfo() {
      getUserInfo().then(res => {
        this.user.userId = res.userId
      })
    },
  },
  mounted() {
    this.getInfo()
  },
}
</script>

<style lang="less" scoped></style>

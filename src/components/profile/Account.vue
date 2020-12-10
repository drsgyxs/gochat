<template>
  <div class="user-account">
    <div class="user-setting-wrap">
      <el-form
        :rules="rules"
        ref="userForm"
        :model="user"
        hide-required-asterisk
      >
        <el-form-item prop="nickname" label="昵称">
          <el-input
            style="width: 225px"
            v-model.trim="user.nickname"
            placeholder="你的昵称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio v-model="user.sex" label="M">男</el-radio>
          <el-radio v-model="user.sex" label="F">女</el-radio>
          <el-radio v-model="user.sex" label="S">保密</el-radio>
        </el-form-item>
        <el-form-item class="user-sign" prop="signature" label="我的签名">
          <el-input
            type="textarea"
            v-model="user.signature"
            placeholder="设置您的签名- ( ゜- ゜)つロ"
          />
        </el-form-item>
        <el-form-item prop="birthday" label="出生日期">
          <el-date-picker
            v-model="user.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="padding-dom"></div>
          <div class="user-my-btn-wrap">
            <el-button
              class="my-btn"
              type="primary"
              @click="saveUser('userForm')"
              >保存</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUserInfo, saveUser } from '../../api/user'

export default {
  name: 'Account',
  data() {
    return {
      user: {
        sex: 'S',
      },
      rules: {
        nickname: [
          { required: true, message: 'Username is required', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    getInfo() {
      getUserInfo()
        .then(res => {
          this.user = {
            ...this.user,
            ...res,
          }
        })
        .catch(() => {
          this.$router.push('/signin')
        })
    },
    saveUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          saveUser(this.user).then(() => {
            this.$message.success('更新成功')
            this.getInfo()
          })
        }
      })
    },
  },
  mounted() {
    this.getInfo()
  },
}
</script>

<style lang="less" scoped>
.user-account {
  padding: 50px 20px 0;
  .my-btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

<template>
  <div class="email-bind"></div>
</template>

<script>
import { getUserInfo, saveUser } from '../../api/user'

export default {
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

<style></style>

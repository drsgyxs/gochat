<template>
  <div class="home">
    <div>
      <input type="text" v-model="username" />
      <br />
      <input type="password" v-model="password" />
      <br />
      <button @click="login">登录</button>
      <button @click="getUserInfo">getUserInfo</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    login() {
      console.log(this.userName)
      this.$http
        .post(
          '/login',
          'username=' + this.username + '&password=' + this.password
        )
        .then(res => {
          console.log(res)
          this.getUserInfo()
        })
    },
    getUserInfo() {
      this.$http({
        url: '/v1/users',
        method: 'get',
        headers: {
          Authentication:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLmt6HlpoLml7blhYkiLCJpc3MiOiJkcnNnIiwiaWF0IjoxNjA1MDgzMDg3LCJleHAiOjE2MDYyOTI2ODd9.BTbz9ajS8ppB6HmxzofwHBAqDcwZNCmRzXEpHgFgSwg209VdPmnunB2xSvdnGmU2RVKS5nhPrpHAiMeUnEdTtw',
        },
      }).then(res => {
        console.log(res)
      })
    },
  },
}
</script>

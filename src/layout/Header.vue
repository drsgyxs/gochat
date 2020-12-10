<template>
  <el-header class="x-header">
    <div class="container">
      <ul>
        <li v-if="user">
          <el-dropdown class="account" trigger="click" @command="handleCommand">
            <div class="avatar-dropdown">
              <el-avatar :src="user.avatarUrl"></el-avatar>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="user-profile"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item command="my-room">我的房间</el-dropdown-item>
              <el-dropdown-item command="sign-out">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <template v-else>
          <li>
            <router-link to="/signin">Sign in</router-link>
          </li>
          <li>
            <router-link class="sign-up" to="/signup">Sign up</router-link>
          </li>
        </template>
      </ul>
    </div>
  </el-header>
</template>

<script>
import { getUserInfo } from '../api/user'

export default {
  name: 'XHeader',
  data() {
    return {
      user: null,
    }
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(res => {
        this.user = res
      })
    },
    handleCommand(command) {
      console.log(command)
      switch (command) {
        case 'user-profile':
          this.$router.push({
            name: 'UserProfile',
          })
          break
        case 'my-room':
          console.log('my-room')
          break
        case 'sign-out':
          console.log('sign-out')
          this.$router.push('/signin')
          break
      }
    },
  },
  mounted() {
    this.getUserInfo()
  },
}
</script>

<style lang="less">
.x-header {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: saturate(180%) blur(5px);
  position: sticky;
  top: 0px;
  z-index: 1000;
  .container {
    height: 100%;
    ul {
      float: right;
      margin: 0;
      padding: 0;
      height: 100%;
      line-height: 60px;
      li {
        list-style: none;
        float: left;
        padding-right: 20px;
        height: 100%;
        .account {
          height: 100%;
          .avatar-dropdown {
            height: 100%;
            display: flex;
            align-items: center;
          }
          .avatar-dropdown:hover {
            cursor: pointer;
            color: #5584ff;
          }
        }
        a {
          color: rgb(0, 0, 0);
          padding: 8px 8px;
          transition: 0.3s;
          border-radius: 2px;
        }
        a.sign-up {
          border: 2px solid #000;
          color: #fff;
          background: #000;
          position: relative;
          overflow: hidden;
          &:hover {
            color: #000;
            background: transparent;
          }
        }
      }
    }
  }
}
</style>

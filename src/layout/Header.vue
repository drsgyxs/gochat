<template>
  <el-header class="x-header">
    <div class="container">
      <div class="header-left">
        <div class="logo">
          <router-link to="/home" title="首页">
            <i class="fas fa-hand-middle-finger"></i>
            gochat
          </router-link>
        </div>
      </div>
      <div class="header-right">
        <div class="user-info" v-if="user">
          <el-dropdown
            class="account-dropdown"
            trigger="click"
            @command="handleCommand"
          >
            <div class="account-dropdown-avatar">
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
        </div>
        <template v-else>
          <div>
            <router-link to="/signin">Sign in</router-link>
          </div>
          <div>
            <router-link class="sign-up" to="/signup">Sign up</router-link>
          </div>
        </template>
      </div>
    </div>
  </el-header>
</template>

<script>
import { getUserInfo } from '../api/user'
import { getMyRoom } from '../api/room'

export default {
  name: 'XHeader',
  data() {
    return {
      user: null,
      commands: {
        'user-profile': 'UserProfile',
        'my-room': 'Room',
        'sign-out': 'Signin',
      },
    }
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(res => {
        this.user = res
      })
    },
    handleCommand(command) {
      switch (command) {
        case 'user-profile':
          this.$router.push({
            name: 'UserProfile',
          })
          break
        case 'my-room':
          this.enterMyRoom()
          break
        case 'sign-out':
          console.log('sign-out')
          this.$router.push('/signin')
          break
      }
    },
    enterMyRoom() {
      getMyRoom(this.user.userId).then(res => {
        if (res) {
          this.$router.push({
            name: 'Room',
            params: {
              roomId: res.roomId,
            },
          })
        } else {
          this.$confirm('你还未创建房间，立即创建？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              this.$router.push('/createroom')
            })
            .catch(() => {})
        }
      })
    },
  },
  mounted() {
    this.getUserInfo()
  },
}
</script>

<style lang="less" scoped>
.x-header {
  width: 100%;
  background-color: rgba(29, 30, 34, 0.9);
  border-bottom: 1px solid #555;
  backdrop-filter: saturate(180%) blur(20px);
  position: sticky;
  top: 0px;
  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    line-height: 60px;
    justify-content: space-between;
    .header-left {
      .logo {
        a {
          text-decoration: none;
          transition: all 0.5s;
          text-transform: uppercase;
          font-size: 24px;
          color: #5584ff;
          font-family: Iceland;
          &:hover {
            animation: neon 2s ease-in-out infinite alternate;
            color: #fff;
          }
        }
      }
    }
    .header-right {
      display: flex;
      justify-content: flex-end;
      .account-dropdown {
        height: 100%;
        .account-dropdown-avatar {
          height: 100%;
          display: flex;
          align-items: center;
          &:hover {
            cursor: pointer;
            color: #5584ff;
          }
        }
      }
      div {
        display: flex;
        align-items: center;
        &:nth-child(n + 2) {
          margin-left: 20px;
        }
        a {
          padding: 5px 5px;
          text-align: center;
          font-size: 18px;
          line-height: 16px;
          transition: 0.3s;
          &:hover {
            color: #fff;
            text-shadow: 0 0 5px #fff, 0 0 10px hsl(223, 100%, 67%),
              0 0 20px hsl(223, 100%, 75%), 0 0 40px hsl(223, 100%, 80%);
          }
        }
      }
    }
  }
}
@keyframes neon {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #5584ff,
      0 0 70px #5584ff, 0 0 80px #5584ff, 0 0 100px #5584ff, 0 0 150px #5584ff;
  }
  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #5584ff, 0 0 20px #5584ff,
      0 0 35px #5584ff, 0 0 40px #5584ff, 0 0 50px #5584ff, 0 0 75px #5584ff;
  }
}
</style>

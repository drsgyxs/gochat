<template>
  <div class="x-room">
    <div class="x-chat-box">
      <div class="chat-box-header">
        <el-avatar
          class="room-owner-avatar"
          shape="square"
          :size="40"
          fit="fill"
          :src="room.owner.avatarUrl"
        >
          <i class="el-icon-user-solid" />
        </el-avatar>
        <div class="room-name">
          {{ room.roomName }}
        </div>
      </div>
      <chat-history :messages="messages" />
      <message-input v-model="message" @click="sendMessage" />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getRoomInfo } from '../api/room'
import { Client } from '@stomp/stompjs'
import ChatHistory from '../components/ChatHistory.vue'
import MessageInput from '../components/MessageInput.vue'

export default {
  components: {
    ChatHistory,
    MessageInput,
  },
  props: ['roomId', 'password'],
  data() {
    return {
      room: {
        owner: {
          avatarUrl: '',
        },
        roomName: '',
      },
      user: null,
      messages: null,
      message: null,
      client: null,
      subscription: null,
    }
  },
  methods: {
    getUserInfo() {
      getUserInfo()
        .then(res => {
          this.user = res
        })
        .catch(() => {})
    },
    onMessageReceived(payload) {
      try {
        const message = JSON.parse(payload.body)
        if (message.type === 'CHAT') {
          if (!this.messages) this.messages = []
          this.messages.push(message)
        }
      } catch (error) {
        console.error('消息格式错误')
      }
    },
    sendMessage() {
      if (this.message && this.client) {
        const chatMessage = {
          content: this.message,
          type: 'CHAT',
        }
        this.client.publish({
          destination: '/app/room/' + this.roomId,
          body: JSON.stringify(chatMessage),
        })
        this.message = null
      }
    },
    webSocketConnect() {
      if (this.client) return
      const webSocketUrl = 'ws://localhost:8080/ws'
      this.client = new Client({
        brokerURL: webSocketUrl,
        debug: str => {
          console.log(str)
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 0,
      })
      this.client.onConnect = this.onConnect
      this.client.onStompError = this.onError
      this.client.activate()
    },
    onConnect() {
      this.subscription = this.client.subscribe(
        `/topic/room/${this.roomId}`,
        this.onMessageReceived,
        {
          passcode: this.password,
        }
      )
      console.log('连接房间成功')
      this.getRoomInfo()
    },
    onError(frame) {
      console.log('Broker reported error: ' + frame.headers['message'])
      console.log('Additional details: ' + frame.body)
      this.$alert('登录后才能发言哦', '请登录').then(() => {
        this.$router.push({ path: '/signin' })
      })
    },
    getRoomInfo() {
      getRoomInfo(this.roomId, {
        password: this.password,
      }).then(res => {
        this.room = res
        if (res) this.room = res
        else {
          if (this.password) {
            this.$alert('密码错误，请重新进入', '提示', {
              showClose: false,
              type: 'warning',
              callback: () => {
                this.$router.push({
                  name: 'home',
                })
              },
            })
          } else {
            this.$alert('无该房间', '提示', {
              type: 'error',
              callback: () => {
                this.$router.push({
                  name: 'home',
                })
              },
            })
          }
        }
      })
    },
  },
  mounted() {
    this.webSocketConnect()
    this.getUserInfo()
    window.onbeforeunload = () => {
      console.warn('window.onbeforeunload...')
      if (this.subscription) {
        this.subscription.unsubscribe()
      }
      if (this.client) {
        this.client.deactivate()
      }
    }
  },
  beforeDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    if (this.client) {
      this.client.deactivate()
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
    console.log(to, from)
    this.getRoomInfo()
    if (this.subscription) {
      this.subscription.unsubscribe()
      console.warn('取消订阅')
      this.subscription = this.client.subscribe(
        `/topic/room/${to.params.roomId}`,
        this.onMessageReceived,
        {
          passcode: this.password,
        }
      )
      console.warn(`订阅${to.params.roomId}`)
    }
  },
}
</script>

<style lang="less">
.x-room {
  height: 100%;
  display: flex;
  justify-content: center;
  .x-chat-box {
    width: 1200px;
    height: 600px;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 50px;
    background-color: #ececec;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
    .chat-box-header {
      background: #fff;
      height: 50px;
      line-height: 50px;
      display: flex;
      .room-owner-avatar {
        margin: 5px 10px;
      }
    }
  }
}
</style>

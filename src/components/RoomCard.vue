<template>
  <div class="room-card" @click="enterRoom(room.roomId, room.isPrivate)">
    <img
      class="room-cover"
      src="https://rpic.douyucdn.cn/live-cover/roomCover/cover_update/2020/11/19/c9a69e468fb6cdca3aeabb0d014c9e5a.jpg/webpdy1"
      alt="https://rpic.douyucdn.cn/live-cover/roomCover/cover_update/2020/11/19/c9a69e468fb6cdca3aeabb0d014c9e5a.jpg/webpdy1"
    />
    <div class="room-info">
      <div class="room-name" :title="room.roomName">{{ room.roomName }}</div>
      <div class="room-owner-name">
        <i class="el-icon-user-solid" />
        <i v-if="room.isPrivate" class="el-icon-lock" />
        {{ room.owner.nickname }}
      </div>
    </div>
  </div>
</template>

<script>
import { getRoomInfo } from '../api/room'

export default {
  props: {
    room: {
      type: Object,
      default: null,
    },
  },
  methods: {
    enterRoom(roomId, isPrivate) {
      if (isPrivate) {
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'password',
          inputPattern: /^.+$/,
          inputErrorMessage: '请输入密码',
        })
          .then(({ value }) => {
            this.validatePasswd(roomId, value)
          })
          .catch(() => {})
      } else this.$router.push({ name: 'room', params: { roomId } })
    },
    validatePasswd(roomId, password) {
      getRoomInfo(roomId, {
        password,
      }).then(res => {
        if (res) {
          this.$router.push({
            name: 'room',
            params: {
              roomId,
              password,
            },
          })
        } else {
          this.$message.error('密码错误')
        }
      })
    },
  },
}
</script>

<style lang="less">
.room-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  .room-cover {
    width: 100%;
  }
  .room-info {
    padding: 0px 10px 8px 8px;
    line-height: 20px;
    .room-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #333;
    }
    .room-owner-name {
      color: #8a8d8f;
      font-size: 12px;
    }
  }
}
.room-card:hover {
  cursor: pointer;
  .room-name {
    color: #ff5d23;
    text-overflow: clip;
  }
}
</style>

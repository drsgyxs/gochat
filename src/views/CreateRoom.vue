<template>
  <div class="create-room">
    <el-form :model="room" class="create-room-form" label-width="100px">
      <el-form-item label="房间名称">
        <el-input v-model.trim="room.roomName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="公告">
        <el-input v-model.trim="room.notice" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="私密房间">
        <el-radio v-model.number="room.isPrivate" :label="1">是</el-radio>
        <el-radio v-model.number="room.isPrivate" :label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="密码" v-if="room.isPrivate === '1'">
        <el-input type="password" v-model.trim="room.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createMyRoom">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createRoom } from '../api/room'

export default {
  data() {
    return {
      room: {
        roomName: null,
        notice: null,
        isPrivate: 0,
        password: null,
      },
    }
  },
  methods: {
    createMyRoom() {
      createRoom(this.room).then(() => {
        this.$message.success('创建成功')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.create-room {
  width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
  .create-room-form {
    width: 500px;
  }
}
</style>

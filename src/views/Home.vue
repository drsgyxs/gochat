<template>
  <div class="x-home">
    <div class="room-list">
      <room-card v-for="room in rooms" :key="room.roomId" :room="room" />
    </div>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
import { getRoomList } from '../api/room'

export default {
  components: {
    RoomCard,
  },
  props: ['roomName'],
  data: () => ({
    rooms: null,
    page: {
      p: 1,
      total: 0,
    },
  }),
  methods: {
    getRooms() {
      getRoomList({
        ...this.page,
        roomName: this.roomName,
      }).then(res => {
        this.rooms = res.list
        res.list.forEach(e => {
          this.rooms.push({
            ...e,
            roomId: e.roomId + 3,
          })
        })
        res.list.forEach(e => {
          this.rooms.push({
            ...e,
            roomId: e.roomId + 6,
          })
        })
        res.list.forEach(e => {
          this.rooms.push({
            ...e,
            roomId: e.roomId + 12,
          })
        })
        this.page.total = res.total
      })
    },
  },
  created() {
    this.getRooms()
  },
}
</script>

<style lang="less">
.x-home {
  // padding: 0 10%;
  background-color: #f2f5f6;
  height: 100%;
  // overflow: scroll;
  .room-list {
    display: grid;
    gap: 10px 10px;
    padding: 20px 10%;
  }
}
@media screen and (min-width: 480px) {
  .room-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 720px) {
  .room-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 960px) {
  .room-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 1200px) {
  .room-list {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>

<template>
  <div class="app-wrapper">
    <x-header></x-header>
    <router-view :key="key" />
  </div>
</template>

<script>
import XHeader from './Header'

export default {
  components: {
    XHeader,
  },
  data() {
    return {
      room: {
        roomName: null,
      },
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
  },
}
</script>

<style lang="less">
.app-wrapper {
  min-height: 100%;
  height: 100%;
  // overflow: hidden;
}
</style>

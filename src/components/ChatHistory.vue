<template>
  <div class="chat-history" ref="chat-history">
    <transition-group name="message-list">
      <chat-message
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </transition-group>
  </div>
</template>

<script>
import ChatMessage from './ChatMessage'

export default {
  name: 'ChatHistory',
  components: {
    ChatMessage,
  },
  props: {
    messages: {
      type: Array,
      default: null,
    },
  },
  watch: {
    messages() {
      const oriHeight = this.$refs['chat-history'].scrollHeight
      const scrollTop = this.$refs['chat-history'].scrollTop
      const clientHeight = this.$refs['chat-history'].clientHeight
      if (oriHeight - scrollTop - clientHeight < clientHeight) {
        this.$nextTick(() => {
          this.$refs['chat-history'].scrollTo({
            top: this.$refs['chat-history'].scrollHeight,
            left: 0,
            behavior: 'smooth',
          })
        })
      }
    },
  },
}
</script>

<style lang="less">
.chat-history {
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0 0;
}
.message-list-enter-active {
  animation: slide-fade-in 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) both;
}
.message-list-leave-active {
  animation: slide-fade-in 0.5s reverse;
}

@keyframes slide-fade-in {
  0% {
    transform: translateX(-200px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes bounce-in-left {
  0% {
    transform: translateX(-600px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateX(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateX(-68px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateX(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateX(-28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateX(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateX(-8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateX(0);
    animation-timing-function: ease-out;
  }
}
</style>

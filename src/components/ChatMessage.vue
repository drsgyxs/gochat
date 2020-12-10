<template>
  <div class="x-chat-message">
    <div class="message-avatar-container">
      <img
        class="message-avatar"
        :src="message.from.avatarUrl"
        alt="https://himg.bdimg.com/sys/portraitn/item/1b98c4f1d3efbfd5c9bd712887"
      />
    </div>
    <div class="message-main">
      <div class="message-nickname">
        <span v-if="message.from.nickname">{{ message.from.nickname }}</span>
        <span v-else>{{ message.from.nickname }}</span>
      </div>
      <div class="message-bubble tri-right round left-in">
        <div class="message-text">
          {{ message.content }}
        </div>
      </div>
    </div>
    <div class="message-place-blank"></div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="less">
.x-chat-message {
  display: flex;
  padding: 8px 0;
  .message-avatar-container {
    padding: 0 10px;
    .message-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .message-main {
    .message-nickname {
      font-size: 12px;
      color: #3f3f3f;
    }
    .message-bubble {
      display: inline-block;
      position: relative;
      height: auto;
      background-color: #fff;
      .message-text {
        padding: 8px 15px;
        text-align: left;
        line-height: 1.5em;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
    .tri-right.left-in::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      left: -7px;
      top: 8px;
      background: inherit;
      z-index: 0;
      border-bottom-left-radius: 10px;
    }
    .tri-right.left-in::after {
      content: '';
      z-index: 1;
      position: absolute;
      // #ececec
      background: #ececec;
      width: 10px;
      height: 12px;
      left: -10px;
      top: 0px;
      border-bottom-left-radius: 8px;
    }
  }
  .message-place-blank {
    width: 100px;
  }
}
.round {
  border-radius: 8px;
}
</style>

<template>
  <label class="message-input" for="message-input">
    <textarea
      class="message-input-area"
      id="message-input"
      cols="30"
      rows="5"
      maxlength="200"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <div class="message-input-bottom">
      <el-button type="primary" @click="$emit('click')">
        Send
      </el-button>
    </div>
  </label>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style lang="less">
.message-input {
  background-color: #fff;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 30px;
  .message-input-area {
    width: 100%;
    height: 70%;
    outline: none;
    border: none;
    resize: none;
    font-size: 16px;
    line-height: 1.5em;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .message-input-bottom {
    // display: flex;
    // flex-direction: row-reverse;
    // justify-content: right;

    width: 100%;
    button {
      float: right;
    }
  }
}
</style>

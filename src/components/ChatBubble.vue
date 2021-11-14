<template>
  <div
    class="
      flex flex-col
      chat
      w-max
      m-4
      ml-8
      p-4
      rounded-lg rounded-bl-none
      text-xl
    "
    :class="{ 'items-end ml-auto mr-8 rounded-bl-lg rounded-br-none': me }"
  >
    <div class="block">{{ name }}</div>
    <div class="block">
      {{ chat }}
    </div>
    <div class="block">
      {{ time }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBubble",
  props: {
    name: {
      type: String,
      required: true,
    },
    chat: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    me: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.chat {
  background-color: $chat-bubble-them;
  color: whitesmoke;

  &.items-end {
    background-color: $chat-bubble-me;
    color: whitesmoke;
  }
}
</style>

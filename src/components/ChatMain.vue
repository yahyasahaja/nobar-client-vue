<template>
  <section
    style="z-index: 1000"
    class="
      chat-main
      fixed
      right-12
      bottom-10
      bg-white
      rounded-xl
      h-4/5
      flex flex-col
      justify-between
      overflow-hidden
    "
  >
    <header class="flex justify-between p-4 shadow-md items-center">
      <div class="flex justify-center">
        <img
          class="w-12 h-12"
          src="../assets/img/logo/connected=true.png"
          alt="logo.png"
        />
      </div>
      <div class="flex justify-center">
        <button class="minimize rounded-full w-7 h-7" @click="handleClick">
          -
        </button>
      </div>
    </header>
    <content class="h-full overflow-y-auto">
      <chat-bubble name="Acnologia" chat="Woi" time="10:12" :me="true" />
      <chat-bubble
        name="Abc"
        chat="woi woi woi woi woi"
        time="10:13"
        :me="false"
      />
    </content>
    <form
      class="p-3 flex"
      style="background-color: #f7f7f7"
      @submit.prevent="submitChat"
    >
      <input
        class="p-3 rounded-full w-full bg-white outline-none"
        placeholder="Type some message here"
      />
      <button type="submit" class="ml-3">
        <img class="w-8 h-7" src="../assets/img/send-icon.png" alt="send" />
      </button>
    </form>
  </section>
</template>

<script>
import ChatBubble from "./ChatBubble.vue"

export default {
  components: { ChatBubble },
  name: "ChatMain",
  methods: {
    submitChat() {
      console.log("send!")
    },
    handleClick() {
      this.$emit("click")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.chat-main {
  width: 425px;

  button.minimize {
    background-color: $chat-bubble-me;
    color: whitesmoke;
  }
}
</style>

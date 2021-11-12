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
    <header class="flex justify-between p-4 shadow-md">
      <div class="flex justify-center">
        <img
          class="w-8 h-8"
          src="../assets/img/logo/connected=true.png"
          alt="logo.png"
        />
      </div>
    </header>
    <content class="h-full">
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
import ChatBubble from "./ChatBubble.vue";

export default {
  components: { ChatBubble },
  name: "ChatMain",
  methods: {
    submitChat() {
      console.log("send!");
    },
  },
};
</script>

<style scoped>
.chat-main {
  width: 425px;
}
</style>

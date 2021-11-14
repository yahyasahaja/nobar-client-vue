<template>
  <main class="chat-nobar-main">
    <chat-main v-if="opened" />
    <floating-button v-else @click="toggleOpened" />
  </main>
</template>

<script>
import FloatingButton from "@/components/FloatingButton"
import ChatMain from "@/components/ChatMain.vue"

export default {
  name: "App",
  components: {
    FloatingButton,
    ChatMain,
  },
  data() {
    return {
      opened: false,
    }
  },
  methods: {
    toggleOpened() {
      this.opened = !this.opened
    },
  },
}
</script>

<style scoped>
.chat-nobar-main {
  font-size: 12px;
}
</style>

<template>
  <main class="chat-nobar-main">
    <chat-main v-if="opened" :messages="messages" @minimize="toggleOpened" />
    <floating-button v-else @click="toggleOpened" />
  </main>
</template>

<script>
import FloatingButton from "@/components/FloatingButton";
import ChatMain from "@/components/ChatMain.vue";
import { STATES } from "../constants/videoConsts";
import { socket, name } from "../content-scripts/connection";
import { CHAT_MESSAGE } from "../constants/videoConsts";

export default {
  name: "App",
  components: {
    FloatingButton,
    ChatMain,
  },
  data() {
    return {
      opened: false,
      videoPlayback: {
        state: STATES.PAUSE,
        time: null,
        youtubeId: null,
      },
      messages: [],
    };
  },
  computed: {
    videoPlayer() {
      return window.VIDEO_PLAYER;
    },
    progressBar() {
      return window.PROGRESS_BAR;
    },
  },
  mounted() {
    this.initEventListeners();
  },
  destroyed() {
    this.removeEventListeners();
  },
  methods: {
    initEventListeners() {
      this.videoPlayer.addEventListener("play", this.handlePlayButtonClick);
      this.videoPlayer.addEventListener("pause", this.handlePauseButtonClick);
      this.progressBar.addEventListener("click", this.handleSeek);
      socket.on(CHAT_MESSAGE, (payload) => {
        payload.me = payload.name === name;
        this.messages.push(payload);
      });
    },
    removeEventListeners() {
      this.videoPlayer.removeEventListener("play", this.handlePlayButtonClick);
      this.videoPlayer.removeEventListener(
        "pause",
        this.handlePauseButtonClick
      );
      this.progressBar.removeEventListener("click", this.handleSeek);
    },
    handleSeek() {
      const currentTime = document.querySelector(
        ".video-stream.html5-main-video"
      ).currentTime;

      console.log("SEEK TIME", currentTime);
    },
    handlePlayButtonClick() {
      console.log("PLAY");
    },
    handlePauseButtonClick() {
      console.log("PAUSE");
    },
    toggleOpened() {
      this.opened = !this.opened;
    },
  },
};
</script>

<style scoped>
.chat-nobar-main {
  font-size: 12px;
}
</style>

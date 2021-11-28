<template>
  <div class="m-6">
    <header class="flex justify-center">
      <img src="../assets/img/logo/connected=false.png" alt="logo.png" />
    </header>
    <p class="text-center">
      Share the url below so others can join the party. The receipt should
      navigate to <span class="font-bold"> this URL </span> and
      <span class="font-bold"> then click on the green Tp icon. </span>
    </p>
    <div class="flex justify-center relative mx-8 mt-6 mb-4" v-if="joined">
      <input
        class="rounded-md p-1 py-2 pr-12 w-full main"
        type="text"
        :value="link"
        disabled
      />
      <button
        class="absolute px-2 right-0 h-full bg-transparent border-0 btn-copy"
        :class="copied ? 'btn-copied' : ''"
        @click="copyClipboard"
      >
        Copy
      </button>
    </div>
    <p></p>
    <div class="text-center mt-6">
      <button
        class="w-full rounded-3xl py-5/2 h-full main"
        @click="handleClick"
      >
        Start Party
      </button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "./EventBus";

const isDev = process.env.NODE_ENV === "development";
const LINK_ORIGIN = isDev
  ? "http://localhost:3000"
  : "https://youtube.com/watch";

export default {
  name: "App",
  data() {
    return {
      copied: false,
      roomId: "",
      videoId: null,
      tabId: null,
      currentTabId: null,
      roomMasterTabId: null,
    };
  },
  computed: {
    roomMaster() {
      return this.currentTabId === this.roomMasterTabId;
    },
    joined() {
      return (
        this.roomMaster || (this.roomId && this.tabId === this.currentTabId)
      );
    },
    link() {
      if (!this.roomId) return null;
      return `${LINK_ORIGIN}?roomId=${this.roomId}${
        this.videoId ? `&v=${this.videoId}` : ""
      }`;
    },
  },
  mounted() {
    eventBus.$on("updateRoom", (roomId) => {
      this.roomId = roomId;
    });
    eventBus.$on("updateVideoId", (videoId) => {
      this.videoId = videoId;
    });
    eventBus.$on("updateTabId", (tabId) => {
      this.tabId = tabId;
    });
    eventBus.$on("updateCurrentTabId", (currentTabId) => {
      this.currentTabId = currentTabId;
    });
    eventBus.$on("updateRoomMasterTabId", (roomMasterTabId) => {
      this.roomMasterTabId = roomMasterTabId;
    });
  },
  methods: {
    copyClipboard() {
      const value = document.querySelector(`input.main`).value;

      if (value) {
        if (window.clipboardData && window.clipboardData.setData) {
          // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
          return window.clipboardData.setData("Text", value);
        } else if (
          document.queryCommandSupported &&
          document.queryCommandSupported("copy")
        ) {
          var textarea = document.createElement("textarea");
          textarea.textContent = value;
          textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
          document.body.appendChild(textarea);
          textarea.select();

          try {
            return document.execCommand("copy"); // Security exception may be thrown by some browsers.
          } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
          } finally {
            document.body.removeChild(textarea);
            this.copied = !this.copied;
          }
        }
      }
    },
    async handleClick() {
      await browser.tabs.executeScript({
        file: "js/content-script.js",
      });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

@font-face {
  font-family: "Nunito";
  src: url("../assets/fonts/Nunito-Regular.ttf") format("truetype"),
    url("../assets/fonts/Nunito-Regular.woff2") format("woff2"),
    url("../assets/fonts/Nunito-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

html {
  border-radius: 10px;
  font-family: "Nunito";
  max-height: 285px;
  width: 375px;
}

input.main {
  background-color: white;
  border: 1px solid $primary;
  color: rgb(179, 179, 179);
  outline: none;
}

button {
  cursor: pointer;

  &.main {
    background-color: $primary;
    border: none;
    color: white;
    font: 900;
  }

  &.btn-copy {
    color: $primary;

    &::before {
      background-color: $primary;
      content: "";
      left: 0;
      height: 60%;
      width: 1px;
      position: absolute;
    }
  }

  &.btn-copied::after {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.83);
    border-radius: 0.5rem 0.5rem 0 0.5rem;
    color: white;
    content: "Link copied";
    display: flex;
    height: 25px;
    justify-content: center;
    position: absolute;
    left: -5.25rem;
    top: -1.75rem;
    padding: 7px;
    width: 100px;
  }
}

.border-l-1 {
  border-left-width: 1px;
}

.py-5\/2 {
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
}
</style>

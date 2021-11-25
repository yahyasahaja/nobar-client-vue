import Vue from "vue";
import App from "./App.vue";
import "../assets/tailwind.css";

// alert("coba");

browser.runtime.onMessage.addListener(function (req) {
  const { type, roomId, tabId, from } = req;

  if (roomId) {
    // eventBus.emit("updateRoom", roomId);
  }
  // if (from === "background" && type === "save-room-id") {
  // }
  console.log("Hello from the background");
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
});

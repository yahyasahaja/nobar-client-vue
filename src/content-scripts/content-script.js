import Vue from "vue";
import App from "../chat/App.vue";
import "../assets/tailwind.css";
import { initConnection } from "./connection";

const isExists = document.querySelector(".chat-nobar-main");

if (!isExists) {
  window.VIDEO_PLAYER = document.querySelector(
    ".video-stream.html5-main-video"
  );
  window.PROGRESS_BAR = document.querySelector(".ytp-progress-bar");
  const appElement = document.createElement("div");
  appElement.setAttribute("id", "app-nobar");
  document.body.appendChild(appElement);
  new Vue({
    el: "#app-nobar",
    render: (h) => h(App),
  });
}

initConnection();

/* eslint-disable no-new */

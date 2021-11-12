import Vue from "vue";
import App from "../chat/App.vue";
import "../assets/tailwind.css";

const appElement = document.createElement("div");
appElement.setAttribute("id", "app-nobar");
document.body.appendChild(appElement);

/* eslint-disable no-new */
new Vue({
  el: "#app-nobar",
  render: (h) => h(App),
});

console.log("Hello from the content-script");

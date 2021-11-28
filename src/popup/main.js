import Vue from "vue";
import App from "./App.vue";
import { init } from "./popupConnection";
import "../assets/tailwind.css";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
});

init();

import Vue from "vue";
import App from "../override/App.vue";

const appElement = document.createElement("div");
appElement.setAttribute("id", "app");
document.body.appendChild(appElement);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
});

console.log("Hello from the content-script");

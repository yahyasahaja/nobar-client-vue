import Vue from "vue"
import App from "../chat/App.vue"
import "../assets/tailwind.css"

const appElement = document.createElement("div")
appElement.setAttribute("id", "app-nobar")
const isExists = document.querySelector("#app-nobar")

if (!isExists) {
  document.body.appendChild(appElement)
  new Vue({
    el: "#app-nobar",
    render: (h) => h(App),
  })
}

/* eslint-disable no-new */

import Vue from "vue"
import io from "socket.io-client"
import { CHAT_MESSAGE, JOIN_ROOM, LEAVE_ROOM } from "../constants/videoConsts"

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

export const roomId = new URLSearchParams(location.search).get("roomId")
export const socket = io("localhost:3000")

export const initConnection = async () => {
  // const tabId = (window.TAB_ID = await getCurrentTab());
  const tabId = Math.random() * 1000
  // const storage = chrome.storage.sync.get(['roomId', 'tabId']);
  // console.log(storage);

  let roomId = null

  socket.on("connect", () => {
    roomId = socket.id
    socket.emit(JOIN_ROOM, { roomId, name: tabId })
    chrome.runtime.sendMessage({
      type: "notification",
      from: "content",
      tabId,
      roomId,
    })
    console.log("connected")

    // socket.on(CHAT_MESSAGE, function({ message }) {
    //   var item = document.createElement('li');
    //   item.textContent = message;
    //   messages.appendChild(item);
    //   window.scrollTo(0, document.body.scrollHeight);
    // });
  })
}

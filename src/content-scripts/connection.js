import io from "socket.io-client";
import {
  // CHAT_MESSAGE,
  JOIN_ROOM,
  MESSAGE_CONNECTED,
} from "../constants/videoConsts";
import { getStorage } from "../utils";

// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }

export const roomId = new URLSearchParams(location.search).get("roomId");
export const socket = io("localhost:3000");

export const initConnection = async () => {
  // const tabId = (window.TAB_ID = await getCurrentTab());
  const tabId = Math.random() * 1000;
  const storage = await getStorage(["roomId", "tabId"]);
  const name = Math.random();

  console.log(storage);

  let roomId = storage?.roomId;

  const init = () => {
    socket.emit(JOIN_ROOM, { roomId, name });
    chrome.runtime.sendMessage({
      type: MESSAGE_CONNECTED,
      from: "content",
      tabId,
      roomId,
    });
    console.log("connected");

    // socket.on(CHAT_MESSAGE, function({ message }) {
    //   var item = document.createElement('li');
    //   item.textContent = message;
    //   messages.appendChild(item);
    //   window.scrollTo(0, document.body.scrollHeight);
    // });
  };

  if (!roomId) {
    socket.on("connect", () => {
      roomId = socket.id;
      init();
    });
  } else {
    init();
  }
};

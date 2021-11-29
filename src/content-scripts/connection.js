import io from "socket.io-client";
import {
  // CHAT_MESSAGE,
  JOIN_ROOM,
  ROOM_CREATED,
} from "../constants/videoConsts";
import { getStorage, setStorage } from "../utils";

export const socket = io("localhost:3000");
const names = ["Joni", "Elon", "Musk", "Si Evan", "Asep", "Juminten", "Fatin"];
export const name = names[Math.floor(Math.random() * names.length)];

export const initConnection = async () => {
  const storage = await getStorage(["roomId", "joinedInvitationLink"]);

  let roomId = storage?.roomId;

  if (!storage?.joinedInvitationLink) {
    socket.on("connect", () => {
      roomId = socket.id;
      socket.emit(JOIN_ROOM, { roomId, name });
      const search = new URLSearchParams(location.search);
      const videoId = search.get("v");
      chrome.runtime.sendMessage({
        type: ROOM_CREATED,
        from: "content",
        roomId,
        videoId,
      });
      console.log("connected as room master");
    });
  } else {
    socket.emit(JOIN_ROOM, { roomId, name });
    await setStorage({ joinedInvitationLink: false });
    console.log("connected as joiner");
  }
};

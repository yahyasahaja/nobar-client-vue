import io from "socket.io-client";
import {
  // CHAT_MESSAGE,
  JOIN_ROOM,
  ROOM_CREATED,
} from "../constants/videoConsts";
import { getStorage, setStorage } from "../utils";

export const socket = io("localhost:3000");

export const initConnection = async () => {
  const storage = await getStorage(["roomId", "joinedInvitationLink"]);
  const name = Math.random();

  let roomId = storage?.roomId;

  const init = () => {
    socket.emit(JOIN_ROOM, { roomId, name });

    // socket.on(CHAT_MESSAGE, function({ message }) {
    //  TODO
    // });
  };

  if (!storage?.joinedInvitationLink) {
    socket.on("connect", () => {
      roomId = socket.id;
      init();
      chrome.runtime.sendMessage({
        type: ROOM_CREATED,
        from: "content",
        roomId,
      });
      console.log("connected as room master");
    });
  } else {
    init();
    await setStorage({ joinedInvitationLink: true });
    console.log("connected as joiner");
  }
};

import { eventBus } from "./EventBus";
import { getStorage } from "../utils";
import {
  // CHAT_MESSAGE,
  // JOIN_ROOM,
  // LEAVE_ROOM,
  MESSAGE_CONNECTED,
} from "../constants/videoConsts";

export const init = async () => {
  browser.runtime.onMessage.addListener(function (req) {
    const { type, roomId /* tabId, from */ } = req;

    if (type === MESSAGE_CONNECTED) {
      // alert(`type:${type}, roomId: ${roomId}, tabId: ${tabId}, from: ${from},`);
      if (roomId) eventBus.$emit("updateRoom", roomId);
    }
  });

  const { roomId, videoId } = await getStorage(["roomId", "videoId"]);
  if (roomId) eventBus.$emit("updateRoom", roomId);
  if (videoId) eventBus.$emit("updateVideoId", videoId);
};

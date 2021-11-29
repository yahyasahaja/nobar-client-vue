import { eventBus } from "./EventBus";
import { getStorage, getCurrentTab, setStorage } from "../utils";
import {
  // CHAT_MESSAGE,
  // JOIN_ROOM,
  // LEAVE_ROOM,
  ROOM_CREATED,
} from "../constants/videoConsts";

export const init = async () => {
  const tab = await getCurrentTab();
  browser.runtime.onMessage.addListener(function (req) {
    const { type, roomId, videoId } = req; // from

    alert(`type:${type}, roomId: ${roomId}, tabId: ${tab.id}`);
    if (type === ROOM_CREATED) {
      if (roomId) eventBus.$emit("updateRoom", roomId);
      if (videoId) eventBus.$emit("updateVideoId", videoId);
      if (tab.id) eventBus.$emit("updateTabId", tab.id);
      setStorage({ roomMasterTabId: tab.id })
        .then(() => {
          eventBus.$emit("updateRoomMasterTabId", roomMasterTabId);
        })
        .catch((error) => console.log(error));
    }
  });

  const { roomId, videoId, tabId, roomMasterTabId } = await getStorage([
    "roomId",
    "videoId",
    "tabId",
    "roomMasterTabId",
  ]);
  if (roomId) eventBus.$emit("updateRoom", roomId);
  if (videoId) eventBus.$emit("updateVideoId", videoId);
  if (tabId) eventBus.$emit("updateTabId", tabId);
  if (roomMasterTabId) eventBus.$emit("updateRoomMasterTabId", roomMasterTabId);
  if (tab) eventBus.$emit("updateCurrentTabId", tab.id);

  console.log(tab.id, roomMasterTabId);
};

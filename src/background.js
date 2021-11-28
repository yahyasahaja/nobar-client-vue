import { setStorage } from "./utils";
// browser.runtime.onMessage.addListener(function (req, sender, sendResponse) {
//   const { type, roomId, tabId, from } = req;
//   if (from === "content" && type === "save-room-id") {
//     chrome.storage.sync.set({ tabId, roomId });
//     chrome.runtime.sendMessage({ ...req, from: "background" });
//   }
//   console.log("Hello from the background");
// });

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "loading") return;

  try {
    const url = new URL(tab.url);
    const search = new URLSearchParams(url.search);
    const roomId = search.get("roomId");
    const videoId = search.get("v");
    if (roomId)
      await setStorage({ tabId, roomId, videoId, joinedInvitationLink: false });
    console.log("Room id saved", tabId, roomId, changeInfo, videoId);
  } catch (error) {
    console.log(error);
  }
});

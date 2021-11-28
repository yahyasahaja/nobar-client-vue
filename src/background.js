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
    // const { origin } = url;
    // if (origin.includes("youtube.com")) {
    //   const roomId = new URLSearchParams(url.search).get("roomId");
    //   chrome.storage.sync.set({ tabId, roomId });
    // }

    const search = new URLSearchParams(url.search);
    const roomId = search.get("roomId");
    const videoId = search.get("v");
    await setStorage({ tabId, roomId, videoId });

    // chrome.storage.sync.set({ tabId, roomId }, () => {
    //   const result = chrome.storage.sync.get(
    //     ["tabId", "roomId"],
    //     function (items) {
    //       var allKeys = Object.keys(items);
    //       console.log(allKeys);
    //     }
    //   );
    //   console.log("result", result);
    // });
    console.log("Room id saved", tabId, roomId, changeInfo, videoId);
  } catch (error) {
    console.log(error);
  }
});

// chrome.windows.getAll({ populate: true }, function (windows) {
//   windows.forEach(function (window) {
//     window.tabs.forEach(function (tab) {
//       try {
//         const tabId = tab.id;
//         const url = new URL(tab.url);
//         const { origin } = url;
//         // if (origin.includes("youtube.com")) {
//         //   const roomId = new URLSearchParams(url.search).get("roomId");
//         //   chrome.storage.sync.set({ tabId, roomId });
//         // }

//         const roomId = new URLSearchParams(url.search).get("roomId");
//         chrome.storage.sync.set({ tabId, roomId });
//         console.log("Room id saved", roomId);
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   });
// });

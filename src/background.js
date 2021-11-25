// browser.runtime.onMessage.addListener(function (req, sender, sendResponse) {
//   const { type, roomId, tabId, from } = req;
//   if (from === "content" && type === "save-room-id") {
//     chrome.storage.sync.set({ tabId, roomId });
//     chrome.runtime.sendMessage({ ...req, from: "background" });
//   }
//   console.log("Hello from the background");
// });

chrome.windows.getAll({ populate: true }, function (windows) {
  windows.forEach(function (window) {
    window.tabs.forEach(function (tab) {
      try {
        const tabId = tab.id;
        const url = new URL(tab.url);
        const { origin } = url;
        if (origin.includes("youtube.com")) {
          const roomId = new URLSearchParams(url.search).get("roomId");
          chrome.storage.sync.set({ tabId, roomId });
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
});

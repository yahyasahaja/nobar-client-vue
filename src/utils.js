export const getStorage = (arg) =>
  new Promise((resolve) => {
    try {
      chrome.storage.sync.get(arg, (items) => resolve(items));
    } catch {
      resolve(null);
    }
  });

export const setStorage = (arg) =>
  new Promise((resolve) => {
    try {
      chrome.storage.sync.set(arg, (items) => resolve(items));
    } catch {
      resolve(null);
    }
  });

export const getCurrentTab = () =>
  new Promise((resolve) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs[0]);
      });
    } catch (error) {
      console.log(error);
      resolve(null);
    }
  });

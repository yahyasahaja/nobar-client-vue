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

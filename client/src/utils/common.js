export const getLocalStorage = (key) => {
  return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : null;
};

export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

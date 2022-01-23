export const toUpperCaseFirstLetter = (string) => {
  if (string.length <= 0) throw new Error('string is not valid');

  return string
    .split(' ')
    .map((word) => {
      const firstLetter = word[0];

      return firstLetter.toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const getLocalStorage = (key) => {
  return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : null;
};

export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
// export const getLocalRefreshToken = () => {
//   const refreshToken = window.localStorage.getItem('refreshToken');
//   return refreshToken;
// };

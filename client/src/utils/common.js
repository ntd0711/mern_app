export const getToken = (key) => {
  return localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))?.state?.[key]
    : null;
};

export const setToken = (token, refreshToken) => {
  if (localStorage.getItem('auth')) {
    const data = JSON.parse(localStorage.getItem('auth'))?.state;
    const newData = {
      state: {
        ...data,
        token,
        refreshToken,
      },
    };
    localStorage.setItem('auth', JSON.stringify(newData));
  }
};

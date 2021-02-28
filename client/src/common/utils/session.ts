const USER_DATA = 'USER_DATA';

export const saveUserData = (data: { id: string; name: string }) => {
  localStorage.setItem(USER_DATA, JSON.stringify(data));
};

export const getUserData = () => {
  const dataString = localStorage.getItem(USER_DATA);
  if (dataString) {
    return JSON.parse(dataString);
  }

  return null;
};

import { useMutation } from '@tanstack/react-query';
import { userApi } from 'api/user-api';

const useLogout = () => {
  return useMutation((payload) => {
    return userApi.signout(payload);
  });
};

export default useLogout;

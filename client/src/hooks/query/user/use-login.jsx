import { useMutation } from '@tanstack/react-query';
import useAuthStore from 'store/authStore';

const useUserAuth = () => {
  const { addUser } = useAuthStore();
  const handleSuccess = (response, variables, context) => {
    addUser(response);
  };

  const handleError = (err, variables, previousValue) => {
    console.log('error');
    console.log({ err, variables, previousValue });
  };

  return useMutation((callback) => callback(), {
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useUserAuth;

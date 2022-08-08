import { useMutation } from '@tanstack/react-query';

const useUpdateProfile = () => {
  return useMutation((callback) => callback());
};

export default useUpdateProfile;
